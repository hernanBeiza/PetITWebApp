import { Component, OnInit, OnDestroy, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";

import { MzModalComponent,MzToastService } from 'ng2-materialize';
import * as moment from 'moment'; 

import { Mensajes } from './../../../../../libs/Mensajes';

// Services
import {EspecialistaLocalDBService} from './../../../../../services/EspecialistaLocalDB.service';
import {CitaLocalDBService} from './../../../../../services/CitaLocalDB.service';
import {BloqueHorarioLocalDBService} from './../../../../../services/BloqueHorarioLocalDB.service';
import {EspecialistaDisponibilidadLocalDBService} from './../../../../../services/EspecialistaDisponibilidadLocalDB.service';
// Models
import {FechaModel} from './../../../../../models/FechaModel';
import {EspecialistaModel} from './../../../../../models/EspecialistaModel';
import {EspecialistaDisponibilidadModel} from './../../../../../models/EspecialistaDisponibilidadModel';
import {BloqueHorarioModel} from './../../../../../models/BloqueHorarioModel';

@Component({
  selector: 'app-bloques-asignar',
  templateUrl: './bloques-asignar.component.html',
  styleUrls: ['./bloques-asignar.component.css']
})
export class BloquesAsignarComponent implements OnInit, OnDestroy {

	public asignarForm:FormGroup;
	public subscription:ISubscription;
	public ocultoControl:AbstractControl;
	public bloquesControl:AbstractControl;
	public fechaDesdeControl:AbstractControl;
	public fechaHastaControl:AbstractControl;

	public enviandoFlag:boolean = false;

	@ViewChild('anularSheetModal') anularSheetModal: MzModalComponent;
	@ViewChild('errorSheetModal') errorSheetModal: MzModalComponent;

	public formErrors = Mensajes.validacionesAsignar;

	public modalOptions: Materialize.ModalOptions = {
	dismissible: false, // Modal can be dismissed by clicking outside of the modal
	opacity: .5, // Opacity of modal background
	inDuration: 300, // Transition in duration
	outDuration: 200, // Transition out duration
	startingTop: '100%', // Starting top style attribute
	endingTop: '10%', // Ending top style attribute
	ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
	  //console.log('Ready');
	  //console.log(modal, trigger);
	},
	complete: () => { 
	  //console.log('Closed'); 
	} // Callback for Modal close
	};

	public errores:string = ""

	public bloques:Array<BloqueHorarioModel> = new Array<BloqueHorarioModel>();

	public especialistas:Array<EspecialistaModel> = new Array<EspecialistaModel>();
	public especialistaModel:EspecialistaModel = new EspecialistaModel();
	public fechaModel:FechaModel;// = new EspecialistaModel();

	public fechaDesde:string;// = "";
	public fechaHasta:string;// = "";

	public fechas:Array<FechaModel>;

	public opcionesCalendarioDesde: Pickadate.DateOptions = {
	format: 'dd-mm-yyyy',
	formatSubmit: 'yyyy-mm-dd',
	min: new Date(),
	today: 'Hoy',
	clear: 'Limpiar',
	close: 'OK',
	onClose: () => { }
	};

	public opcionesCalendarioHasta: Pickadate.DateOptions = {
	format: 'dd-mm-yyyy',
	formatSubmit: 'yyyy-mm-dd',
	min: new Date(),
	today: 'Hoy',
	clear: 'Limpiar',
	close: 'OK',
	onClose: () => this.cargarBloques()
	};

	public seleccionado:boolean = false;

	constructor(private fb:FormBuilder, 
	private ActivatedRoute: ActivatedRoute, 
	private MzToastService:MzToastService,
	private EspecialistaLocalDBService:EspecialistaLocalDBService,
	private EspecialistaDisponibilidadLocalDBService:EspecialistaDisponibilidadLocalDBService,
	private CitaLocalDBService:CitaLocalDBService,
	private BloqueHorarioLocalDBService:BloqueHorarioLocalDBService) { }

	ngOnInit(): void { 
		this.asignarForm = this.fb.group({
			'bloques': ['',null],
			'fechaDesde': [this.fechaDesde, Validators.compose([Validators.required])],
			'fechaHasta': [this.fechaHasta, Validators.compose([Validators.required])],
		});

	    this.bloquesControl = this.asignarForm.controls['bloques'];
	    this.fechaDesdeControl = this.asignarForm.controls['fechaDesde'];
	    this.fechaHastaControl = this.asignarForm.controls['fechaHasta'];

		this.ocultoControl = new FormControl(this.seleccionado, Validators.compose([Validators.required]));
		this.asignarForm.addControl("oculto",this.ocultoControl);

        this.subscription = this.bloquesControl.valueChanges.subscribe((v)=>{
        	if(this.haySeleccionados()){
	        	this.ocultoControl.setValue(true);
        	} else {
        		this.ocultoControl.setValue(null);
        	}
        	this.ocultoControl.markAsTouched();
        });

        this.cargarEspecialista();
	}

	private cargarEspecialista(){
	    this.ActivatedRoute.params.subscribe((param: any) => {
			let rut = param['rut'];
			if(rut != undefined || rut == "undefined"){
				this.obtenerEspecialistaConRut(rut);
			} else {
				this.MzToastService.show("No hay rut de especialista.",4000,"red");
			}
		});
	}

	public haySeleccionados(): boolean {
		var hay:boolean = false;
		for (var i = 0;i<this.fechas.length; i ++) {
			let fecha:FechaModel = this.fechas[i];
			if(fecha.seleccionado){
				hay = true;
				break;
			}
		}
		return hay;
	}


	public obtenerEspecialistaConRut(rut:string):void {
		this.EspecialistaLocalDBService.obtenerConRut(rut).then((data:any)=> {
	    	if(data.result){
		    	this.especialistaModel = data.especialista;
    			this.bloques = new Array<BloqueHorarioModel>();    
	    	}
	    },(dataError:any)=>{

	    });
	}

	private cargarBloques(): void {
		this.bloques = new Array<BloqueHorarioModel>();
	    this.BloqueHorarioLocalDBService.obtener().then((data:any)=> {
	    	if(data.result){
		    	this.bloques = data.bloques;
		    	//Una fecha por cada rango
		    	this.crearFechas();
	    	}
	    },(dataError:any)=>{

	    });
	}

	//Pasar a un servicio
	private crearFechas(){
		let inicio = new Date(this.fechaDesde);
		let fin = new Date(this.fechaHasta);
		let rango = this.obtenerFechasSinFinde(inicio,fin);
		this.fechas = new Array<FechaModel>();
		var idFecha:number = 1;
		for (var i = 0; i < rango.length; ++i) {
			let item:Date = rango[i];
			for (var j = 0; j < this.bloques.length; ++j) {
				let bloque:BloqueHorarioModel = this.bloques[j];
				let fecha:FechaModel = new FechaModel(idFecha,item,bloque);
				this.fechas.push(fecha);
				idFecha++;
			}
		}
	}

	//Pasar a un servicio
	public obtenerFechasSinFinde(inicio:Date,fin:Date): Array<Date> {
		//console.log(inicio,fin);
    	var todas:Array<Date> = new Array<Date>();

    	var start = moment(inicio, 'YYYY-MM-DD');
    	let end = moment(fin, 'YYYY-MM-DD');

    	//console.log(start,end);
    	while (start <= end) {
			if (start.format('ddd') !== 'Sat' && start.format('ddd') !== 'Sun'){ 
	    		//console.log(start.format("YYYY-MM-DD"));
	    		todas.push(new Date(start.format("YYYY-MM-DD")));
			}
			start = moment(start, 'YYYY-MM-DD').add(1, 'days');
		}
		return todas;
	}

	public seleccionarTodos(): void {
		console.log("seleccionarTodos");
		for (var i = 0; i < this.fechas.length; ++i) {
			var fecha:FechaModel = this.fechas[i];
			if(fecha.seleccionado){
				fecha.seleccionado = false;
			} else {
				fecha.seleccionado = true;
			}
		}
	}

	public onSubmit(values:Object):void {
		if (this.asignarForm.valid) {
			console.log(this.especialistaModel);
			console.log(this.fechaDesde);
			console.log(this.fechaHasta);
			console.log(this.bloques);
			//this.registrarSheetModal.open();
		} else {
			this.MzToastService.show("Revisa los datos faltantes",5000);
		}
	}

	public registrar():void {
		console.warn("registrar");
	}
	
	/*
	public asignar(bloque:BloqueHorarioModel):void {
		console.log(this.especialistaModel);
		console.log(this.fechaDesde);
		console.log(this.fechaHasta);
		console.log(bloque);

		var enviar = true;
		var errores="Le faltó seleccionar:<br>";
		if(this.especialistaModel==null){
			enviar = false;
			errores+="Seleccionar un especialista<br>";
		}
		if(this.fechaDesde==null || this.fechaDesde ==""){
			enviar = false;
			errores+="Seleccionar la fecha de inicio<br>";			
		}
		if(this.fechaHasta==null || this.fechaHasta ==""){
			enviar = false;
			errores+="Seleccionar la fecha de término<br>";			
		}

		if(enviar){
			var especialistaDisponibilidad:EspecialistaDisponibilidadModel = new EspecialistaDisponibilidadModel();
			especialistaDisponibilidad.idespecialista = this.especialistaModel.idespecialista;
			especialistaDisponibilidad.idbloquehorario = bloque.idbloquehorario;
			especialistaDisponibilidad.fecha = this.fechaDesde;

			this.EspecialistaDisponibilidadLocalDBService.guardar(especialistaDisponibilidad).then((data:any)=>{
				this.registrarSheetModal.close();
				if(data.result){
					this.MzToastService.show(data.mensajes,3000,'green');
					//this.registrarForm.reset();
				} else {
					this.MzToastService.show(data.errores,5000,'red');
				}
			},(dataError:any)=>{
				this.registrarSheetModal.close();
				this.MzToastService.show(dataError.errores,5000,'red');
			});

		} else {
			console.warn(errores);
			this.errores = errores;
			this.errorSheetModal.open();
		}
	}
	*/

	ngOnDestroy():void {
		this.subscription.unsubscribe();
	}

}
