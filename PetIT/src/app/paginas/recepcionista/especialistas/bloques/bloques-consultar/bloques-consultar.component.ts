import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  selector: 'app-bloques-consultar',
  templateUrl: './bloques-consultar.component.html',
  styleUrls: ['./bloques-consultar.component.css']
})
export class BloquesConsultarComponent implements OnInit {

	public asignarForm:FormGroup;
	public especialistaControl:AbstractControl;
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

	public disponibilidades:Array<EspecialistaDisponibilidadModel> = new Array<EspecialistaDisponibilidadModel>();

	public especialistas:Array<EspecialistaModel> = new Array<EspecialistaModel>();
	public especialistaModel:EspecialistaModel;// = new EspecialistaModel();
	public especialistaDisponibilidadModel:EspecialistaDisponibilidadModel;// = new EspecialistaModel();

	public fechaDesde:string;// = "";
	public fechaHasta:string;// = "";

	public opcionesCalendarioDesde: Pickadate.DateOptions = {
	format: 'dd-mm-yyyy',
	formatSubmit: 'yyyy-mm-dd',
	min: new Date(),
	today: 'Hoy',
	clear: 'Limpiar',
	close: 'OK',
	onClose: () => { this.cargarDisponibilidades()}
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
		});

	    this.especialistaControl = this.asignarForm.controls['especialista'];
	    this.fechaDesdeControl = this.asignarForm.controls['fechaDesde'];
	    this.fechaHastaControl = this.asignarForm.controls['fechaHasta'];

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

	private cargarDisponibilidades(): void {
		if(this.especialistaModel!=null && this.fechaDesde!=null && this.fechaHasta!=null){
			console.log("cargarDisponibilidades");
			console.log(this.fechaDesde,this.fechaHasta);
			this.disponibilidades = new Array<EspecialistaDisponibilidadModel>();
		    this.EspecialistaDisponibilidadLocalDBService.obtenerConEspecialistaEntreFechas(this.especialistaModel,this.fechaDesde,this.fechaHasta).then((data:any)=> {
		    	if(data.result){
			    	this.disponibilidades = data.disponibilidades;
		    	} else {
		    		this.MzToastService.show(data.errores,4000,"red");
		    	}
		    },(dataError:any)=>{
		    	console.log(dataError);
	    		this.MzToastService.show(dataError.errores,4000,"red");
		    });
		}
	}

	public anular(item:EspecialistaDisponibilidadModel): void {
		this.especialistaDisponibilidadModel = item;
		this.anularSheetModal.openModal();
	}

	public confirmarAnulacion(): void {
		this.anularSheetModal.closeModal();
		this.EspecialistaDisponibilidadLocalDBService.eliminar(this.especialistaDisponibilidadModel).then((data:any)=> {
	    	if(data.result){
				this.MzToastService.show(data.mensajes,4000,'green');
	    		this.cargarDisponibilidades();
	    	}
	    },(dataError:any)=>{
			this.MzToastService.show(dataError.errores,4000,'red');    
	    });
	}

	public irAgregar():void {
		if(this.especialistaModel){
			console.log(this.especialistaModel.rut);
			this.router.navigate(['/recepcionista/especialistas/bloques/asignar/'+this.especialistaModel.rut]);			
		} else {
			this.MzToastService.show("Debes seleccionar un especialista",4000,'red');
		}
	}

}
