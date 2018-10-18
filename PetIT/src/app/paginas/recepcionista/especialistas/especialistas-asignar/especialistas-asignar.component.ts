import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MzModalComponent,MzToastService } from 'ng2-materialize';

import { Mensajes } from './../../../../libs/Mensajes';

// Services
import {EspecialidadLocalDBService} from './../../../../services/EspecialidadLocalDB.service';
import {EspecialistaLocalDBService} from './../../../../services/EspecialistaLocalDB.service';
import {CitaLocalDBService} from './../../../../services/CitaLocalDB.service';
import {BloqueHorarioLocalDBService} from './../../../../services/BloqueHorarioLocalDB.service';
import {EspecialistaDisponibilidadLocalDBService} from './../../../../services/EspecialistaDisponibilidadLocalDB.service';
// Models
import {EspecialidadModel} from './../../../../models/EspecialidadModel';
import {EspecialistaModel} from './../../../../models/EspecialistaModel';
import {EspecialistaDisponibilidadModel} from './../../../../models/EspecialistaDisponibilidadModel';

import {BloqueHorarioModel} from './../../../../models/BloqueHorarioModel';

@Component({
  selector: 'app-especialistas-asignar',
  templateUrl: './especialistas-asignar.component.html',
  styleUrls: ['./especialistas-asignar.component.css']
})
export class EspecialistasAsignarComponent implements OnInit {

	public asignarForm:FormGroup;
	public especialidadControl:AbstractControl;
	public especialistaControl:AbstractControl;
	public fechaDesdeControl:AbstractControl;
	public fechaHastaControl:AbstractControl;

	public enviandoFlag:boolean = false;

	@ViewChild('registrarSheetModal') registrarSheetModal: MzModalComponent;
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
	//Arreglo de especialidades
	public bloques:Array<BloqueHorarioModel> = new Array<BloqueHorarioModel>();
	public especialidades:Array<EspecialidadModel> = new Array<EspecialidadModel>();
	public especialistas:Array<EspecialistaModel> = new Array<EspecialistaModel>();


	public especialidadModel:EspecialidadModel;// = new EspecialidadModel();
	public especialistaModel:EspecialistaModel;// = new EspecialistaModel();

	public fechaDesde:string;// = "";
	public fechaHasta:string;// = "";

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

	constructor(private fb:FormBuilder, 
	private MzToastService:MzToastService,
	private EspecialidadLocalDBService:EspecialidadLocalDBService,
	private EspecialistaLocalDBService:EspecialistaLocalDBService,
	private EspecialistaDisponibilidadLocalDBService:EspecialistaDisponibilidadLocalDBService,
	private CitaLocalDBService:CitaLocalDBService,
	private BloqueHorarioLocalDBService:BloqueHorarioLocalDBService) { }

	ngOnInit(): void { 
	    console.log("EspecialistasAsignarComponent");
		this.asignarForm = this.fb.group({
			'especialidad': [this.especialidadModel, Validators.compose([Validators.required])],
			'especialista': [this.especialistaModel, Validators.compose([Validators.required])],
			'fechaDesde': [this.fechaDesde, Validators.compose([Validators.required])],
			'fechaHasta': [this.fechaHasta, Validators.compose([Validators.required])],
		});

	    this.especialidadControl = this.asignarForm.controls['especialidad'];
	    this.especialistaControl = this.asignarForm.controls['especialista'];
	    this.fechaDesdeControl = this.asignarForm.controls['fechaDesde'];
	    this.fechaHastaControl = this.asignarForm.controls['fechaHasta'];

		this.cargarEspecialidades();
		this.cargarBloques();
	}

	private cargarBloques(): void {
	    this.BloqueHorarioLocalDBService.obtener().then((data:any)=> {
	    	if(data.result){
		    	this.bloques = data.bloques;
	    	}
	    },(dataError:any)=>{

	    });
	}

	private cargarEspecialidades():void {
	    this.EspecialidadLocalDBService.obtener().then((data:any)=> {
	      console.log(data);
	      if(data.result){
	        this.especialidades = data.especialidades;
	      }
	    },(dataError:any)=> {
	      console.warn(dataError);
	    });
	}

	public seleccionarEspecialidad(event):void {
		this.especialistaControl.reset();
		this.fechaDesdeControl.reset();
		this.fechaHastaControl.reset();
		this.bloques = new Array<BloqueHorarioModel>();    
		this.cargarEspecialistas();
	}

	public seleccionarEspecialista(event):void {    
		this.fechaDesdeControl.reset();
		this.fechaHastaControl.reset();
		this.bloques = new Array<BloqueHorarioModel>();    
	}

	private cargarEspecialistas():void {
		this.EspecialistaLocalDBService.obtenerConEspecialidad(this.especialidadModel).then((data:any)=>{
		  if(data.result){
		    this.especialistas = data.especialistas;
		  }
		},(dataError:any)=>{
		  console.warn(dataError);
		});
	}

	public onSubmit(values:Object):void {
		/*
		if (this.registrarForm.valid) {
			this.registrarSheetModal.open();
		} else {
			this.MzToastService.show("Revisa los datos faltantes",5000);
		}
		*/
	}

	public registrar():void {
		console.log("registrar");
	}
	
	public asignar(bloque:BloqueHorarioModel):void {
		console.log(this.especialidadModel);
		console.log(this.especialistaModel);
		console.log(this.fechaDesde);
		console.log(this.fechaHasta);
		console.log(bloque);

		var enviar = true;
		var errores="Le faltó seleccionar:<br>";
		if(this.especialidadModel==null){
			enviar = false;
			errores+="Seleccionar una especialidad<br>";			
		}
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

}
