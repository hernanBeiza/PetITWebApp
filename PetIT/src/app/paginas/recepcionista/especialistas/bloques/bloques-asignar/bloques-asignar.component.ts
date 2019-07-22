import { Component, OnInit, OnDestroy, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { MzModalComponent,MzToastService } from 'ngx-materialize';
import * as moment from 'moment'; 

import { Mensajes } from './../../../../../libs/Mensajes';

// Services
import {EspecialistaLocalDBService} from './../../../../../services/EspecialistaLocalDB.service';
import {CitaLocalDBService} from './../../../../../services/CitaLocalDB.service';
import {BloqueHorarioLocalDBService} from './../../../../../services/BloqueHorarioLocalDB.service';
import {EspecialistaDisponibilidadLocalDBService} from './../../../../../services/EspecialistaDisponibilidadLocalDB.service';
// Models
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
	public subscription:Subscription;
	public ocultoControl:AbstractControl;
	public bloquesControl:AbstractControl;
	public fechaDesdeControl:AbstractControl;
	public fechaHastaControl:AbstractControl;

	public enviandoFlag:boolean = false;

	@ViewChild('asignarSheetModal') asignarSheetModal: MzModalComponent;
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

	public disponibilidades:Array<EspecialistaDisponibilidadModel> = new Array<EspecialistaDisponibilidadModel>();

	public especialistas:Array<EspecialistaModel> = new Array<EspecialistaModel>();
	public especialistaModel:EspecialistaModel = new EspecialistaModel();

	public fechaDesde:string;// = "";
	public fechaHasta:string;// = "";

	public opcionesCalendarioDesde: Pickadate.DateOptions = {
	format: 'dd-mm-yyyy',
	formatSubmit: 'yyyy-mm-dd',
	min: new Date(),
	today: 'Hoy',
	clear: 'Limpiar',
	close: 'OK',
	onClose: () => { this.cargarDisponibilidades() }
	};

	public opcionesCalendarioHasta: Pickadate.DateOptions = {
	format: 'dd-mm-yyyy',
	formatSubmit: 'yyyy-mm-dd',
	min: new Date(),
	today: 'Hoy',
	clear: 'Limpiar',
	close: 'OK',
	onClose: () => this.cargarDisponibilidades()
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
			'disponibilidades': ['',null],
			'fechaDesde': [this.fechaDesde, Validators.compose([Validators.required])],
			'fechaHasta': [this.fechaHasta, Validators.compose([Validators.required])],
		});

	    this.bloquesControl = this.asignarForm.controls['disponibilidades'];
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
		for (var i = 0;i<this.disponibilidades.length; i ++) {
			let fecha:EspecialistaDisponibilidadModel = this.disponibilidades[i];
			if(fecha.seleccionado){
				hay = true;
				break;
			}
		}
		return hay;
	}

	public obtenerSeleccionadas():Array<EspecialistaDisponibilidadModel>{
		var seleccionadas:Array<EspecialistaDisponibilidadModel> = new Array<EspecialistaDisponibilidadModel>();
		for (var i = 0;i<this.disponibilidades.length; i ++) {
			let fecha:EspecialistaDisponibilidadModel = this.disponibilidades[i];
			if(fecha.seleccionado==true){
				seleccionadas.push(fecha);
			}
		}
		return seleccionadas;
	}

	public obtenerEspecialistaConRut(rut:string):void {
		this.EspecialistaLocalDBService.obtenerConRut(rut).then((data:any)=> {
	    	if(data.result){
		    	this.especialistaModel = data.especialista;
    			this.disponibilidades = new Array<EspecialistaDisponibilidadModel>();    
	    	} else {
    			this.disponibilidades = new Array<EspecialistaDisponibilidadModel>();    
	    	}
	    },(dataError:any)=>{
	    });
	}

	private cargarDisponibilidades(): void {
		console.log("cargarDisponibilidades");
		if(this.especialistaModel!=null && this.fechaDesde!=null && this.fechaHasta!=null){
			console.log(this.fechaDesde,this.fechaHasta);
			this.disponibilidades = new Array<EspecialistaDisponibilidadModel>();
		    this.EspecialistaDisponibilidadLocalDBService.obtenerDisponiblesEntreFechas(this.fechaDesde,this.fechaHasta).then((data:any)=> {
		    	if(data.result){
			    	this.disponibilidades = data.disponibilidades;
		    	} else {
					this.disponibilidades = new Array<EspecialistaDisponibilidadModel>();
		    	}
		    },(dataError:any)=>{
				this.disponibilidades = new Array<EspecialistaDisponibilidadModel>();
		    });
		}
	}


	public seleccionarTodos(): void {
		console.log("seleccionarTodos");
		for (var i = 0; i < this.disponibilidades.length; ++i) {
			var disponibilidad:EspecialistaDisponibilidadModel = this.disponibilidades[i];
			if(disponibilidad.seleccionado){
				disponibilidad.seleccionado = false;
			} else {
				disponibilidad.seleccionado = true;
			}
		}
	}

	public onSubmit(values:Object):void {
		if (this.asignarForm.valid) {
			console.log(this.especialistaModel);
			console.log(this.fechaDesde);
			console.log(this.fechaHasta);
			console.log(this.obtenerSeleccionadas());
			this.asignarSheetModal.openModal();
		} else {
			this.MzToastService.show("Revisa los datos faltantes",5000);
		}
	}

	public confirmarAsignacion():void {
		console.warn("confirmarAsignacion");
		console.log(this.especialistaModel);
		console.log(this.fechaDesde);
		console.log(this.fechaHasta);
		console.log(this.obtenerSeleccionadas());

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
		if(!this.haySeleccionados()){
			enviar = false;
			errores+="No hay bloques horarios seleccionados<br>";			
		}

		if(enviar){

			var items:Array<EspecialistaDisponibilidadModel> = new Array<EspecialistaDisponibilidadModel>();
			for (var i = 0; i < this.obtenerSeleccionadas().length; i++) {
				let disponibilidad = this.obtenerSeleccionadas()[i];
				var especialistaDisponibilidad:EspecialistaDisponibilidadModel = new EspecialistaDisponibilidadModel();
				especialistaDisponibilidad.idespecialista = this.especialistaModel.idespecialista;
				especialistaDisponibilidad.idbloquehorario = disponibilidad.bloqueHorarioModel.idbloquehorario;
				especialistaDisponibilidad.fecha = moment(disponibilidad.fecha).utc(false).format("YYYY-MM-DD");
				items.push(especialistaDisponibilidad);
			}

			this.EspecialistaDisponibilidadLocalDBService.guardar(items).then((data:any)=>{
				this.asignarSheetModal.closeModal();
				if(data.result){
					this.MzToastService.show(data.mensajes,3000,'green');
					this.disponibilidades = new Array<EspecialistaDisponibilidadModel>();
					this.asignarForm.reset();
				} else {
					this.MzToastService.show(data.errores,5000,'red');
				}
			},(dataError:any)=>{
				this.asignarSheetModal.closeModal();
				this.MzToastService.show(dataError.errores,5000,'red');
			});

		} else {
			console.warn(errores);
			this.errores = errores;
			this.errorSheetModal.openModal();
		}

	}

	ngOnDestroy():void {
		this.subscription.unsubscribe();
	}

}
