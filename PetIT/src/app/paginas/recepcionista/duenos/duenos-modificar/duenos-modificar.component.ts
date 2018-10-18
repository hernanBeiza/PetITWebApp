import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

import { Mensajes } from './../../../../libs/Mensajes';
import { Validaciones } from './../../../../libs/Validaciones';

import { ComunaLocalDBService } from './../../../../services/ComunaLocalDB.service';
import { DuenoMascotaLocalDBService } from './../../../../services/DuenoMascotaLocalDB.service';

import { RutValidator } from 'ng2-rut';

//Models
import { UsuarioModel } from './../../../../models/UsuarioModel';
import { DuenoMascotaModel } from './../../../../models/DuenoMascotaModel';
import { ComunaModel } from './../../../../models/ComunaModel';

@Component({
  selector: 'app-duenos-modificar',
  templateUrl: './duenos-modificar.component.html',
  styleUrls: ['./duenos-modificar.component.css']
})
export class DuenosModificarComponent implements OnInit {

	public registrarForm:FormGroup;

	public rutControl:AbstractControl;
	public nombresControl:AbstractControl;
	public paternoControl:AbstractControl;
	public maternoControl:AbstractControl;
	public comunaControl:AbstractControl;
	public direccionControl:AbstractControl;
	public telefonoControl:AbstractControl;
	public emailControl:AbstractControl;
	public contrasena:AbstractControl;
	public contrasenaConfirmar:AbstractControl;

	public enviandoFlag:boolean = false;

	@ViewChild('modificarSheetModal') modificarSheetModal: MzModalComponent;
	@ViewChild('errorSheetModal') errorSheetModal: MzModalComponent;
	public errores:string = "";

	public duenoModel:DuenoMascotaModel = new DuenoMascotaModel();
	public usuarioModel:UsuarioModel = new UsuarioModel();
  	public comunas:Array<ComunaModel> = new Array<ComunaModel>();
	public formErrors = Mensajes.validacionesAgregarDueno;

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
        private ComunaLocalDBService: ComunaLocalDBService,
	    private DuenoMascotaLocalDBService:DuenoMascotaLocalDBService) { }

	ngOnInit(): void { 
	    console.log("DuenoModificarComponent");
   		this.registrarForm = this.fb.group({
	      'rut': [this.duenoModel.rutdueno, Validators.compose([Validators.required])],
	      'nombres': [this.duenoModel.nombres, Validators.compose([Validators.required])],
	      'paterno': [this.duenoModel.apellidopaterno, Validators.compose([Validators.required])],
	      'materno': [this.duenoModel.apellidomaterno, Validators.compose([Validators.required])],
	      'comuna': [this.duenoModel.idcomuna, Validators.compose([Validators.required])],
	      'direccion': [this.duenoModel.direccion, Validators.compose([Validators.required])],
	      'email': [this.duenoModel.correo, Validators.compose([Validators.required,Validators.email])],
	      'telefono': [this.duenoModel.telefono, Validators.compose([Validators.required])],
	      'contrasena': [this.usuarioModel.password, Validators.compose([Validators.required,Validators.minLength(7)])],
	      'contrasenaConfirmar': [this.usuarioModel.passwordConfirmar, Validators.compose([Validators.required,Validaciones.MatchPassword,Validators.minLength(7)])],
	    });
        
        this.rutControl = this.registrarForm.controls['rut'];
		this.nombresControl = this.registrarForm.controls['nombres'];
		this.paternoControl = this.registrarForm.controls['paterno'];
		this.maternoControl = this.registrarForm.controls['materno'];
		this.comunaControl = this.registrarForm.controls['comuna'];
		this.direccionControl = this.registrarForm.controls['direccion'];
		this.emailControl = this.registrarForm.controls['email'];
		this.telefonoControl = this.registrarForm.controls['telefono'];
		this.contrasena = this.registrarForm.controls['contrasena'];
		this.contrasenaConfirmar = this.registrarForm.controls['contrasenaConfirmar'];

		this.obtenerComunas();

		// Obtener el id del dueño desde la ruta del navegador
	    this.ActivatedRoute.params.subscribe((param: any) => {
			let rutdueno = param['rutdueno'];
			if(rutdueno != undefined || rutdueno == "undefined"){
				this.obtenerConRut(rutdueno);
			} else {
				this.MzToastService.show("No hay id de dueno.",5000,"red");
			}
		});
	}

	public obtenerComunas(){
		this.ComunaLocalDBService.obtener().then((data:any)=>{
			if(data.result){
				this.comunas = data.comunas;
			} else {

			}
		},(dataError:any)=>{
			this.MzToastService.show(dataError.errores,5000,'red');
		});
	}

	public obtenerConRut(rut:string){
		this.DuenoMascotaLocalDBService.obtenerConRut(rut).then((data:any)=>{
			if(data.result){
				this.duenoModel = data.dueno;
				this.MzToastService.show(data.mensajes,2000,'green');
			} else {
				this.MzToastService.show(data.errores,5000,'red');
			}
		},(dataError:any)=>{
			this.MzToastService.show(dataError.errores,5000,'red');
		});
	}

	public onSeleccionarComuna(event): void {

	}

	public volver(): void {

	}
	
	public onSubmit(values:Object):void {
		if (this.registrarForm.valid) {
			this.modificarSheetModal.open();
		} else {
		  this.MzToastService.show("Revisa los datos faltantes",5000);
		}
	}

	public modificar():void {
		this.DuenoMascotaLocalDBService.modificar(this.duenoModel).then((data:any)=>{
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
