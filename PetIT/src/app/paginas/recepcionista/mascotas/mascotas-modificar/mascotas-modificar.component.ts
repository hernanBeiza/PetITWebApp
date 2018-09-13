import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

import { Mensajes } from './../../../../libs/Mensajes';

import { MascotaLocalDBService } from './../../../../services/MascotaLocalDB.service';
import { DuenoMascotaLocalDBService } from './../../../../services/DuenoMascotaLocalDB.service';
import { RazaLocalDBService } from './../../../../services/RazaLocalDB.service';
import { TipoMascotaLocalDBService } from './../../../../services/TipoMascotaLocalDB.service';

import { RutValidator } from 'ng2-rut';

import { DuenoMascotaModel } from './../../../../models/DuenoMascotaModel';
import { MascotaModel } from './../../../../models/MascotaModel';
import { TipoMascotaModel } from './../../../../models/TipoMascotaModel';
import { RazaModel } from './../../../../models/RazaModel';

@Component({
  selector: 'app-mascotas-modificar',
  templateUrl: './mascotas-modificar.component.html',
  styleUrls: ['./mascotas-modificar.component.css']
})
export class MascotasModificarComponent implements OnInit {
	public modificarForm:FormGroup;

	public rutDuenoControl:AbstractControl;
	public rutMascotaControl:AbstractControl;
	public tipoMascotaControl:AbstractControl;
	public razaMascotaControl:AbstractControl;
	public nombreMascotaControl:AbstractControl;
	public pesoMascotaControl:AbstractControl;
	public edadMascotaControl:AbstractControl;

	public enviandoFlag:boolean = false;

	@ViewChild('modificarSheetModal') modificarSheetModal: MzModalComponent;
	@ViewChild('errorSheetModal') errorSheetModal: MzModalComponent;
	public errores:string = "";
	
	public mascotaModel:MascotaModel = new MascotaModel();
	public duenoModel:DuenoMascotaModel = new DuenoMascotaModel();

	public razaModel:RazaModel = new RazaModel();
	public tipoModel:TipoMascotaModel = new TipoMascotaModel();

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
        private RutValidator: RutValidator,
	    private MascotaLocalDBService:MascotaLocalDBService,
	    private RazaLocalDBService:RazaLocalDBService,
	    private TipoMascotaLocalDBService:TipoMascotaLocalDBService,
	    private DuenoMascotaLocalDBService:DuenoMascotaLocalDBService) { }

	ngOnInit(): void { 
	    console.log("MascotaModificarComponent");
		this.modificarForm = this.fb.group({
	      'rutMascota': [this.mascotaModel.rutmascota, Validators.compose([Validators.required])],
	      'tipoMascota': [this.mascotaModel.idtipomascota, Validators.compose([Validators.required])],
	      'razaMascota': [this.mascotaModel.idraza, Validators.compose([Validators.required])],
	      'nombreMascota': [this.mascotaModel.nombre, Validators.compose([Validators.required])],
	      'pesoMascota': [this.mascotaModel.peso, Validators.compose([Validators.required])],
	      'edadMascota': [this.mascotaModel.edad, Validators.compose([Validators.required])],
	    });
        
        this.rutMascotaControl = this.modificarForm.controls['rutMascota'];
		this.tipoMascotaControl = this.modificarForm.controls['tipoMascota'];
		this.razaMascotaControl = this.modificarForm.controls['razaMascota'];
		this.nombreMascotaControl = this.modificarForm.controls['nombreMascota'];
		this.pesoMascotaControl = this.modificarForm.controls['pesoMascota'];
		this.edadMascotaControl = this.modificarForm.controls['edadMascota'];
		// Obtener el id del dueño desde la ruta del navegador para poder asignarlo a la
	    this.ActivatedRoute.params.subscribe((param: any) => {
			let rutmascota = param['rutmascota'];
			if(rutmascota != undefined || rutmascota == "undefined"){
				this.obtenerMascotaConRut(rutmascota);
			} else {
				this.MzToastService.show("No hay rut de mascota.",5000,"red");
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

	public seleccionarTipo(e:any){
		console.log(e);
	}

	public seleccionarRaza(e:any){
		console.log(e);
	}

	public obtenerMascotaConRut(rutmascota:string){
		console.log("obtenerMascotaConRut",rutmascota);
		this.MascotaLocalDBService.obtenerConRut(rutmascota).then((data:any)=>{
			if(data.result){
				this.mascotaModel = data.mascota;
				this.obtenerDuenoConRut(this.mascotaModel.rutdueno);
				this.MzToastService.show(data.mensajes,2000,'green');
			} else {
				this.MzToastService.show(data.errores,4000,'red');
			}
		},(dataError:any)=>{
			this.MzToastService.show(dataError.errores,4000,'red');
		});
	}

	public obtenerDuenoConRut(rutdueno:string){
		console.log("obtenerDuenoConRut",rutdueno);
		this.DuenoMascotaLocalDBService.obtenerConRut(rutdueno).then((data:any)=>{
			if(data.result){
				this.duenoModel = data.dueno;
				//this.MzToastService.show(data.mensajes,2000,'green');
			} else {
				this.MzToastService.show(data.errores,4000,'red');
			}
		},(dataError:any)=>{
			this.MzToastService.show(dataError.errores,4000,'red');
		});
	}

	public onSubmit(values:Object):void {
		if (this.modificarForm.valid) {
  			this.modificarSheetModal.open();
		} else {
		  this.MzToastService.show("Revisa los datos faltantes",5000);
		}
	}

	public modificar():void {
		this.MascotaLocalDBService.modificar(this.mascotaModel).then((data:any)=>{
			this.modificarSheetModal.close();
			if(data.result){
				this.MzToastService.show(data.mensajes,3000,'green');
			} else {
				this.MzToastService.show(data.errores,5000,'red');
			}
		},(dataError:any)=>{
			this.modificarSheetModal.close();
			this.MzToastService.show(dataError.errores,5000,'red');
		});
	}
}
