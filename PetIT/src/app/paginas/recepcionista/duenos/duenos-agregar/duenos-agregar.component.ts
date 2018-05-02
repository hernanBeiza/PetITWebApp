import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

import { Mensajes } from './../../../../libs/Mensajes';

import { DuenoLocalDBService } from './../../../../services/DuenoLocalDB.service';

import { RutValidator } from 'ng2-rut';

import { DuenoModel } from './../../../../models/DuenoModel';

@Component({
  selector: 'app-duenos-agregar',
  templateUrl: './duenos-agregar.component.html',
  styleUrls: ['./duenos-agregar.component.css']
})
export class DuenosAgregarComponent implements OnInit {

	public registrarForm:FormGroup;

	public rutControl:AbstractControl;
	public nombreControl:AbstractControl;
	public apellidoControl:AbstractControl;
	public emailControl:AbstractControl;
	public telefonoControl:AbstractControl;
	public direccionControl:AbstractControl;

	public enviandoFlag:boolean = false;

	@ViewChild('registrarSheetModal') registrarSheetModal: MzModalComponent;
	@ViewChild('errorSheetModal') errorSheetModal: MzModalComponent;
	public errores:string = "";

	public duenoModel:DuenoModel = new DuenoModel();

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


	constructor(private router:Router, private fb:FormBuilder, private activatedRoute: ActivatedRoute, 
	    private MzToastService:MzToastService,
        private RutValidator: RutValidator,
	    private DuenoLocalDBService:DuenoLocalDBService) { }

	ngOnInit(): void { 
	    console.log("DuenoAgregarComponent");
	    this.registrarForm = this.fb.group({
	      'rut': [this.duenoModel.rut, Validators.compose([Validators.required])],
	      'nombre': [this.duenoModel.nombre, Validators.compose([Validators.required])],
	      //'apellido': [this.duenoModel.apellido, Validators.compose([Validators.required])],
	      //'email': [this.duenoModel.email, Validators.compose([Validators.required,Validators.email])],
	      //'telefono': [this.duenoModel.telefono, Validators.compose([Validators.required])],
	      'direccion': [this.duenoModel.direccion, Validators.compose([Validators.required])],
	    });
        
        this.rutControl = this.registrarForm.controls['rut'];
		this.nombreControl = this.registrarForm.controls['nombre'];
		this.direccionControl = this.registrarForm.controls['direccion'];
	}

	public onSubmit(values:Object):void {
		if (this.registrarForm.valid) {
			this.registrarSheetModal.open();
		} else {
			this.MzToastService.show("Revisa los datos faltantes",5000);
		}
	}

	public registrar():void {
		this.DuenoLocalDBService.guardar(this.duenoModel).then((data:any)=>{
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
