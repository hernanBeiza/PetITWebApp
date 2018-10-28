import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  selector: 'app-bloques-consultar',
  templateUrl: './bloques-consultar.component.html',
  styleUrls: ['./bloques-consultar.component.css']
})
export class BloquesConsultarComponent implements OnInit {

	public asignarForm:FormGroup;
	public especialistaControl:AbstractControl;
	public fechaDesdeControl:AbstractControl;
	public fechaHastaControl:AbstractControl;
	public bloqueHorarioControl:AbstractControl;

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
	public especialistaModel:EspecialistaModel;// = new EspecialistaModel();
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
	onClose: () => { this.cargarBloques()}
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

	constructor(private router:Router, private fb:FormBuilder, 
	private MzToastService:MzToastService,
	private EspecialistaLocalDBService:EspecialistaLocalDBService,
	private EspecialistaDisponibilidadLocalDBService:EspecialistaDisponibilidadLocalDBService,
	private CitaLocalDBService:CitaLocalDBService,
	private BloqueHorarioLocalDBService:BloqueHorarioLocalDBService) { }

	ngOnInit(): void { 
		this.asignarForm = this.fb.group({
			'especialista': [this.especialistaModel, Validators.compose([Validators.required])],
			'fechaDesde': [this.fechaDesde, Validators.compose([Validators.required])],
			'fechaHasta': [this.fechaHasta, Validators.compose([Validators.required])],
			'bloqueHorario': [this.seleccionado, Validators.compose([Validators.required])],
		});

	    this.especialistaControl = this.asignarForm.controls['especialista'];
	    this.fechaDesdeControl = this.asignarForm.controls['fechaDesde'];
	    this.fechaHastaControl = this.asignarForm.controls['fechaHasta'];
	    this.bloqueHorarioControl = this.asignarForm.controls['bloqueHorario'];

		this.cargarEspecialistas();
	}

	private cargarEspecialistas():void {
		this.EspecialistaLocalDBService.obtener().then((data:any)=>{
		  if(data.result){
		    this.especialistas = data.especialistas;
		  }
		},(dataError:any)=>{
		  console.warn(dataError);
		});
	}

	public seleccionarEspecialista(event):void {    
		this.fechaDesdeControl.reset();
		this.fechaHastaControl.reset();
	}

	private cargarBloques(): void {
		if(this.fechaDesde!=null && this.fechaHasta!=null){
			console.log("cargarBloques");
			console.log(this.fechaDesde,this.fechaHasta);

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
	}

	//Pasar a un servicio
	private crearFechas(){
		console.log("crearFechas();");
		let inicio = new Date(this.fechaDesde);
		let fin = new Date(this.fechaHasta);
		//console.log(inicio.toUTCString(),fin.toUTCString());

		let rango = this.obtenerFechasSinFinde(inicio,fin);
		
		var idFecha:number = 1;
		this.fechas = new Array<FechaModel>();

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
		console.log("obtenerFechasSinFinde();");

    	var todas:Array<Date> = new Array<Date>();

    	var start = moment(inicio, 'YYYY-MM-DD').utc(false);
    	let end = moment(fin, 'YYYY-MM-DD').utc(false);

    	//Ojo con la zona horario. Se usa UTC
    	while (start <= end) {
			if (start.format('ddd') !== 'Sat' && start.format('ddd') !== 'Sun'){
				//console.log(start.format("ddd"));
	    		//console.log(start.utc(false).format("YYYY-MM-DD"));
	    		todas.push(new Date(start.utc(false).format("YYYY-MM-DD")));
			}
			start = moment(start, 'YYYY-MM-DD').utc(false).add(1, 'days');
		}
		return todas;
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
	
	public anular(fecha:FechaModel): void {
		console.warn("anular");
		this.fechaModel = fecha;
		this.anularSheetModal.open();
	}

	public confirmarAnulacion(): void {
		this.anularSheetModal.close();
		console.warn("llamar a servicio para anular el bloque horario");
		this.MzToastService.show("Hora anulada correctamente ¡Esto es una simulación!",4000,'green');
	}

	public irAgregar():void {
		if(this.especialistaModel){
			console.log(this.especialistaModel.rut);
			this.router.navigate(['/recepcionista/especialistas/bloques/asignar/'+this.especialistaModel.rut]);			
		} else {
			this.MzToastService.show("Debes seleccionar un especialista",4000,'red');
		}
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

}
