import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MzModalComponent,MzToastService } from 'ng2-materialize';

import { Mensajes } from './../../../../libs/Mensajes';

// Services
import {EspecialidadLocalDBService} from './../../../../services/EspecialidadLocalDB.service';
import {EspecialistaLocalDBService} from './../../../../services/EspecialistaLocalDB.service';
import {HoraLocalDBService} from './../../../../services/HoraLocalDB.service';
import {CitaLocalDBService} from './../../../../services/CitaLocalDB.service';
// Models
import {MascotaModel} from './../../../../models/MascotaModel';
import {EspecialidadModel} from './../../../../models/EspecialidadModel';
import {EspecialistaModel} from './../../../../models/EspecialistaModel';
import {HoraModel} from './../../../../models/HoraModel';
import {CitaModel} from './../../../../models/CitaModel';

@Component({
  selector: 'app-especialistas-asignar',
  templateUrl: './especialistas-asignar.component.html',
  styleUrls: ['./especialistas-asignar.component.css']
})
export class EspecialistasAsignarComponent implements OnInit {

	public buscarForm:FormGroup;
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
	public especialidades:Array<EspecialidadModel> = new Array<EspecialidadModel>();
	public especialistas:Array<EspecialistaModel> = new Array<EspecialistaModel>();
	public horas:Array<HoraModel> = new Array<HoraModel>();

	public fechaDesde:string = "";
	public fechaHasta:string = "";

	public especialidadModel:EspecialidadModel = new EspecialidadModel();
	public especialistaModel:EspecialistaModel = new EspecialistaModel();
	public citaModel:CitaModel = new CitaModel();

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
	onClose: () => this.cargarHoras()
	};

	public opcionesReloj: Pickadate.TimeOptions = {
	default: 'now', // Set default time: 'now', '1:30AM', '16:30'
	fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
	twelvehour: false, // Use AM/PM or 24-hour format
	donetext: 'OK', // text for done-button
	cleartext: 'Limpiar', // text for clear-button
	canceltext: 'Cancelar', // Text for cancel-button
	autoclose: false, // automatic close timepicker
	ampmclickable: true, // make AM PM clickable
	};

	constructor(private router:Router, private fb:FormBuilder, private activatedRoute: ActivatedRoute, 
	private MzToastService:MzToastService,
	private EspecialidadLocalDBService:EspecialidadLocalDBService,
	private EspecialistaLocalDBService:EspecialistaLocalDBService,
	private HoraLocalDBService:HoraLocalDBService,
	private CitaLocalDBService:CitaLocalDBService) { }

	ngOnInit(): void { 
	    console.log("EspecialistasAsignarComponent");
		this.buscarForm = this.fb.group({
			'especialidad': [this.especialidadModel, Validators.compose([Validators.required])],
			'especialista': [this.especialistaModel, Validators.compose([Validators.required])],
			'fechaDesde': [this.fechaDesde, Validators.compose([Validators.required])],
			'fechaHasta': [this.fechaHasta, Validators.compose([Validators.required])],
		});

	    this.especialidadControl = this.buscarForm.controls['especialidad'];
	    this.especialistaControl = this.buscarForm.controls['especialista'];
	    this.fechaDesdeControl = this.buscarForm.controls['fechaDesde'];
	    this.fechaHastaControl = this.buscarForm.controls['fechaHasta'];

		this.cargarEspecialidades();
	}

	private cargarEspecialidades():void {
	    this.EspecialidadLocalDBService.obtener().then((data:any)=> {
	      console.log(data);
	      if(data.result){
	        this.especialidades = data.especialidades;
	      }
	    },(dataError)=> {
	      console.warn(dataError);
	    });
	}

	public seleccionarEspecialidad(event):void {
		console.log("seleccionarEspecialidad");
		console.log(this.especialidadModel);
		this.especialistaControl.reset();
		this.fechaDesdeControl.reset();
		this.fechaHastaControl.reset();
		this.horas = new Array<HoraModel>();    
		this.cargarEspecialistas();
	}

	public seleccionarEspecialista(event):void {    
		console.log("seleccionarEspecialista");
		this.citaModel.idespecialista = this.especialistaModel.idespecialista;
		this.citaModel.especialistaModel = this.especialistaModel;
		this.fechaDesdeControl.reset();
		this.fechaHastaControl.reset();
		this.horas = new Array<HoraModel>();    
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

	private cargarHoras():void {
		console.log("cargarHoras();");
		/*
		this.HoraLocalDBService.obtenerConEspecialistayFecha(this.especialistaModel,this.fecha).then((data:any)=>{
		  console.log(data);
		  if(data.result){
		    this.horas = data.horas;
		    this.MzToastService.show(data.mensajes, 4000, 'green');
		  }
		},(dataError:any)=>{
		  console.warn(dataError);  
		  this.MzToastService.show(dataError.errores, 5000, 'red');
		});
		*/
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

	public asignar():void {
		/*
		this.DuenoMascotaLocalDBService.guardar(this.duenoModel).then((data:any)=>{
			this.registrarSheetModal.close();
			if(data.result){
				this.MzToastService.show(data.mensajes,3000,'green');
				this.registrarForm.reset();
			} else {
				this.MzToastService.show(data.errores,5000,'red');
			}
		},(dataError:any)=>{
			this.registrarSheetModal.close();
			this.MzToastService.show(dataError.errores,5000,'red');
		});
		*/
	}
}
