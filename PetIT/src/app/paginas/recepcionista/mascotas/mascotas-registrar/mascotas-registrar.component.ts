import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

import { Mensajes } from './../../../../libs/Mensajes';

import { DuenoLocalDBService } from './../../../../services/DuenoLocalDB.service';
import { MascotaLocalDBService } from './../../../../services/MascotaLocalDB.service';

import { RutValidator } from 'ng2-rut';

import { DuenoModel } from './../../../../models/DuenoModel';
import { MascotaModel } from './../../../../models/MascotaModel';

@Component({
  selector: 'app-mascotas-registrar',
  templateUrl: './mascotas-registrar.component.html',
  styleUrls: ['./mascotas-registrar.component.css']
})
export class MascotasRegistrarComponent implements OnInit {
	public registrarForm:FormGroup;

	public rutDuenoControl:AbstractControl;
	public nombreDuenoControl:AbstractControl;
	public nombreMascotaControl:AbstractControl;

	public enviandoFlag:boolean = false;

	@ViewChild('registrarSheetModal') registrarSheetModal: MzModalComponent;
	@ViewChild('errorSheetModal') errorSheetModal: MzModalComponent;

	public duenoModel:DuenoModel = new DuenoModel();
	public mascotaModel:MascotaModel = new MascotaModel();

	public formErrors = Mensajes.validacionesAgregarMascota;

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
	    private DuenoLocalDBService:DuenoLocalDBService,
	    private MascotaLocalDBService:MascotaLocalDBService) { }

	ngOnInit(): void { 
	    console.log("MascotaAgregarComponent");
	    this.registrarForm = this.fb.group({
	      'rutDueno': [this.duenoModel.rut, Validators.compose([Validators.required])],
	      'nombreDueno': [this.duenoModel.nombre, Validators.compose([Validators.required])],
	      'nombreMascota': [this.mascotaModel.nombre, Validators.compose([Validators.required])],
	    });
        
        this.rutDuenoControl = this.registrarForm.controls['rutDueno'];

        this.nombreDuenoControl = this.registrarForm.controls['nombreDueno'];

		this.nombreMascotaControl = this.registrarForm.controls['nombreMascota'];
		// Obtener el id del dueño desde la ruta del navegador para poder asignarlo a la mascota
	    this.ActivatedRoute.params.subscribe((param: any) => {
			let iddueno = param['iddueno'];
			if(iddueno != undefined || iddueno == "undefined"){
				this.obtenerConID(iddueno);

			} else {
				this.MzToastService.show("No hay id de dueno.",5000,"red");
			}
		});
	}

	private obtenerConID(id:number): void {
		this.DuenoLocalDBService.obtenerConID(id).then((data:any)=>{
			if(data.result){
				this.duenoModel = data.dueno;
		        this.rutDuenoControl.disable();        
		        this.nombreDuenoControl.disable();

			} else {
				this.MzToastService.show(data.errores,5000,'red');
			}
		},(dataError:any)=>{
			this.MzToastService.show(dataError.errores,5000,'red');
		});
	}

	public onSubmit(values:Object):void {
		if (this.registrarForm.valid) {
			this.registrarSheetModal.open();
		} else {
		  this.MzToastService.show("Revisa los datos faltantes",5000);
		}
	}

	private registrar():void {
		console.warn("Sin Implementar aún");
		console.log(this.mascotaModel);
		this.mascotaModel.iddueno = this.duenoModel.iddueno;
		console.log(this.duenoModel);
		this.MascotaLocalDBService.guardar(this.mascotaModel).then((data:any)=>{
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
	}
}
