import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { MzModalComponent,MzToastService } from 'ngx-materialize';

import { Mensajes } from './../../../../libs/Mensajes';

import { DuenoMascotaLocalDBService } from './../../../../services/DuenoMascotaLocalDB.service';
import { MascotaLocalDBService } from './../../../../services/MascotaLocalDB.service';
import { RazaLocalDBService } from './../../../../services/RazaLocalDB.service';
import { TipoMascotaLocalDBService } from './../../../../services/TipoMascotaLocalDB.service';

import { RutValidator } from 'ng2-rut';

import { DuenoMascotaModel } from './../../../../models/DuenoMascotaModel';
import { MascotaModel } from './../../../../models/MascotaModel';
import { TipoMascotaModel } from './../../../../models/TipoMascotaModel';
import { RazaModel } from './../../../../models/RazaModel';

@Component({
  selector: 'app-mascotas-agregar',
  templateUrl: './mascotas-agregar.component.html',
  styleUrls: ['./mascotas-agregar.component.css']
})
export class MascotasAgregarComponent implements OnInit {
	public registrarForm:FormGroup;

	public rutDuenoControl:AbstractControl;
	public rutMascotaControl:AbstractControl;
	public tipoMascotaControl:AbstractControl;
	public razaMascotaControl:AbstractControl;
	public nombreMascotaControl:AbstractControl;
	public pesoMascotaControl:AbstractControl;
	public edadMascotaControl:AbstractControl;

	public enviandoFlag:boolean = false;

	@ViewChild('registrarSheetModal') registrarSheetModal: MzModalComponent;
	@ViewChild('errorSheetModal') errorSheetModal: MzModalComponent;
	public errores:string = "";
	
	public duenoModel:DuenoMascotaModel = new DuenoMascotaModel();
	public mascotaModel:MascotaModel = new MascotaModel();

	public formErrors = Mensajes.validacionesAgregarMascota;

	public tipos:Array<TipoMascotaModel> = new Array<TipoMascotaModel>();
	public razas:Array<RazaModel> = new Array<RazaModel>();

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


	constructor(private router:Router, private fb:FormBuilder, private ActivatedRoute: ActivatedRoute, 
	    private MzToastService:MzToastService,
	    private DuenoMascotaLocalDBService:DuenoMascotaLocalDBService,
	    private MascotaLocalDBService:MascotaLocalDBService,
	    private RazaLocalDBService:RazaLocalDBService,
	    private TipoMascotaLocalDBService:TipoMascotaLocalDBService) { }

	ngOnInit(): void { 
	    console.log("MascotaAgregarComponent");
	    this.registrarForm = this.fb.group({
	      'rutMascota': [this.mascotaModel.rutmascota, Validators.compose([Validators.required])],
	      'tipoMascota': [this.mascotaModel.idtipomascota, Validators.compose([Validators.required])],
	      'razaMascota': [this.mascotaModel.idraza, Validators.compose([Validators.required])],
	      'nombreMascota': [this.mascotaModel.nombre, Validators.compose([Validators.required])],
	      'pesoMascota': [this.mascotaModel.peso, Validators.compose([Validators.required])],
	      'edadMascota': [this.mascotaModel.edad, Validators.compose([Validators.required])],
	    });
        
        this.rutMascotaControl = this.registrarForm.controls['rutMascota'];
		this.tipoMascotaControl = this.registrarForm.controls['tipoMascota'];
		this.razaMascotaControl = this.registrarForm.controls['razaMascota'];
		this.nombreMascotaControl = this.registrarForm.controls['nombreMascota'];
		this.pesoMascotaControl = this.registrarForm.controls['pesoMascota'];
		this.edadMascotaControl = this.registrarForm.controls['edadMascota'];
		// Obtener el id del dueño desde la ruta del navegador para poder asignarlo a la mascota
	    this.ActivatedRoute.params.subscribe((param: any) => {
			let rutdueno = param['rutdueno'];
			if(rutdueno != undefined || rutdueno == "undefined"){
				this.obtenerConRut(rutdueno);
			} else {
				this.MzToastService.show("No hay rut de dueño.",5000,"red");
			}
		});
		this.obtenerTipos();
		this.obtenerRazas();
	}

	private obtenerRazas():void {
		this.RazaLocalDBService.obtener().then((data:any) =>{
			if(data.result){
				this.razas = data.razas;
			} else {
				this.MzToastService.show(data.errores,5000,'red');
			}
		},(dataError:any)=>{
			this.MzToastService.show(dataError.errores,5000,'red');
		});
	}

	private obtenerTipos(): void {
		this.TipoMascotaLocalDBService.obtener().then((data:any) =>{
			if(data.result){
				this.tipos = data.tipos;
			} else {
				this.MzToastService.show(data.errores,5000,'red');
			}
		},(dataError:any)=>{
			this.MzToastService.show(dataError.errores,5000,'red');
		});
	}

	private obtenerConRut(rut:string): void {
		this.DuenoMascotaLocalDBService.obtenerConRut(rut).then((data:any)=>{
			if(data.result){
				console.log(data.dueno);
				this.duenoModel = data.dueno;
			} else {
				this.MzToastService.show(data.errores,5000,'red');
			}
		},(dataError:any)=>{
			this.MzToastService.show(dataError.errores,5000,'red');
		});
	}

	public onSubmit(values:Object):void {
		if (this.registrarForm.valid) {
			this.registrarSheetModal.openModal();
		} else {
		  this.MzToastService.show("Revisa los datos faltantes",5000);
		}
	}

	public registrar():void {
		console.log(this.mascotaModel);
		this.mascotaModel.rutdueno = this.duenoModel.rutdueno;
		console.log(this.duenoModel);
		this.MascotaLocalDBService.guardar(this.mascotaModel).then((data:any)=>{
			this.registrarSheetModal.closeModal();
			if(data.result){
				this.MzToastService.show(data.mensajes,3000,'green');
				this.registrarForm.reset();
			} else {
				this.MzToastService.show(data.errores,5000,'red');
			}
		},(dataError:any)=>{
			this.registrarSheetModal.closeModal();
			this.MzToastService.show(dataError.errores,5000,'red');
		});
	}
}
