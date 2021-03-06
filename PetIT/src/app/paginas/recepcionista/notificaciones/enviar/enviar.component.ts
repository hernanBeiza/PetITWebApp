import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { FormGroup, FormArray, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { MzModalComponent,MzToastService } from 'ngx-materialize';

import { Mensajes } from './../../../../libs/Mensajes';
import { Validaciones } from './../../../../libs/Validaciones';

import { DuenoMascotaModel } from './../../../../models/DuenoMascotaModel';
import { NotificacionModel } from './../../../../models/NotificacionModel';
import { DuenoMascotaLocalDBService} from './../../../../services/DuenoMascotaLocalDB.service';

@Component({
  selector: 'app-enviar',
  templateUrl: './enviar.component.html',
  styleUrls: ['./enviar.component.css']
})
export class EnviarComponent implements OnInit, OnDestroy {

	private imagen:File;

	public enviarForm:FormGroup;

	public ocultoControl:AbstractControl;
	public destinatariosControl:AbstractControl;
	public imagenControl:AbstractControl;
	public tituloControl:AbstractControl;
	public mensajeControl:AbstractControl;

	public subscription:Subscription;

	@ViewChild('confirmarSheetModal') confirmarSheetModal: MzModalComponent;

	public formErrors = Mensajes.validacionesEnviarNotificacion;

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
		} 
	};

	public enviandoFlag:boolean = false;

	public duenos:Array<DuenoMascotaModel> = new Array<DuenoMascotaModel>();

	public notificacionModel:NotificacionModel = new NotificacionModel();

	public seleccionado:boolean = false;

	constructor(private router:Router, private fb:FormBuilder,private MzToastService: MzToastService,
		private DuenoMascotaLocalDBService:DuenoMascotaLocalDBService) { }

	ngOnInit(): void { 

	    this.enviarForm = this.fb.group({
	      'destinatarios': ['',null],
	      'imagen': [this.notificacionModel.imagen, Validators.compose([Validators.required])],
	      'titulo': [this.notificacionModel.titulo, Validators.compose([Validators.required,Validators.minLength(9),Validators.maxLength(100)])],
	      'mensaje': [this.notificacionModel.mensaje, Validators.compose([Validators.required])],
	    });        

        this.destinatariosControl = this.enviarForm.controls['destinatarios'];
        this.imagenControl = this.enviarForm.controls['imagen'];
        this.tituloControl = this.enviarForm.controls['titulo'];
        this.mensajeControl = this.enviarForm.controls['mensaje'];

        this.subscription = this.destinatariosControl.valueChanges.subscribe((v)=>{
        	//console.log(v);
        	this.ocultoControl.markAsTouched();
        	if(this.haySeleccionados()){
	        	this.ocultoControl.setValue(true);
        	} else {
        		this.ocultoControl.setValue(null);
        	}
        	//console.log(this.ocultoControl.invalid);
        	//console.log(this.ocultoControl.errors);
        });

		this.ocultoControl = new FormControl(this.seleccionado, Validators.compose([Validators.required]));
		this.enviarForm.addControl("oculto",this.ocultoControl);


		this.cargarDuenos();
	}

	public cargarDuenos(): void {
		this.DuenoMascotaLocalDBService.obtener().then((data:any)=>{
			if(data.result){
				this.duenos = data.duenos;
			} else {
				this.MzToastService.show("¡Error! No hay dueños registrados",3000,"red");
			}
		},(dataError:any)=>{
			console.error(dataError);
		});
	}

	public seleccionarTodos(): void {
		for (var i = 0; i < this.duenos.length; ++i) {
			var dueno:DuenoMascotaModel = this.duenos[i];
			if(dueno.seleccionado){
				dueno.seleccionado = false;
			} else {
				dueno.seleccionado = true;
			}
		}
	}

	public onPageChange(pagina:number): void {
		console.log(pagina);
	}

	public obtenerArchivos(files:FileList) {
		//console.log("obtenerArchivos");
		//console.log(files);
		this.imagen = files[0];
		console.log(this.imagen);
	}

	public onSubmit(values:Object):void {
		console.log(this.notificacionModel);
	    if (this.enviarForm.valid) {	    	
	    	this.confirmarSheetModal.openModal();
	    } else {
			this.MzToastService.show("¡Error! Revisa tus datos de acceso",3000,"red");
	    }
	}

	public enviarNotificacion(): void {
		this.confirmarSheetModal.closeModal();
		console.log(this.duenos);
		for (var i = 0; i < this.duenos.length; ++i) {
			var dueno:DuenoMascotaModel = this.duenos[i];
			if(dueno.seleccionado){
				console.log(dueno);
			}
		}
		this.enviarForm.reset();
		this.MzToastService.show("¡Notificación enviada!", 5000,"green");
	}

	public haySeleccionados(): boolean {
		var hay:boolean = false;
		for (var i = 0;i<this.duenos.length; i ++) {
			let dueno:DuenoMascotaModel = this.duenos[i];
			if(dueno.seleccionado){
				hay = true;
				break;
			}
		}
		return hay;
	}

	ngOnDestroy() {
		//console.log("EnviarComponent: ngOnDestroy();");
		this.subscription.unsubscribe();
	}

}