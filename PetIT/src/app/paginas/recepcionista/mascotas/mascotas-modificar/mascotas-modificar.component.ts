import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

import { Mensajes } from './../../../../libs/Mensajes';

import { MascotaLocalDBService } from './../../../../services/MascotaLocalDB.service';
import { DuenoLocalDBService } from './../../../../services/DuenoLocalDB.service';

import { RutValidator } from 'ng2-rut';

import { DuenoModel } from './../../../../models/DuenoModel';
import { MascotaModel } from './../../../../models/MascotaModel';

@Component({
  selector: 'app-mascotas-modificar',
  templateUrl: './mascotas-modificar.component.html',
  styleUrls: ['./mascotas-modificar.component.css']
})
export class MascotasModificarComponent implements OnInit {
	public modificarForm:FormGroup;

	public nombreMascotaControl:AbstractControl;

	public enviandoFlag:boolean = false;

	@ViewChild('modificarSheetModal') modificarSheetModal: MzModalComponent;
	@ViewChild('errorSheetModal') errorSheetModal: MzModalComponent;

	public mascotaModel:MascotaModel = new MascotaModel();
	public duenoModel:DuenoModel = new DuenoModel();

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
        private RutValidator: RutValidator,
	    private MascotaLocalDBService:MascotaLocalDBService,
	    private DuenoLocalDBService:DuenoLocalDBService) { }

	ngOnInit(): void { 
	    console.log("MascotaModificarComponent");
	    this.modificarForm = this.fb.group({
	      'nombreMascota': [this.mascotaModel.nombre, Validators.compose([Validators.required])],
	    });

		this.nombreMascotaControl = this.modificarForm.controls['nombreMascota'];

	    this.ActivatedRoute.params.subscribe((param: any) => {
			let idmascota = param['idmascota'];
			if(idmascota != undefined || idmascota == "undefined"){
				this.obtenerMascotaConID(idmascota);
			} else {
				this.MzToastService.show("No hay id de dueno.",5000,"red");
			}
		});
	}

	public obtenerMascotaConID(idmascota:number){
		console.log("obtenerMascotaConID",idmascota);
		this.MascotaLocalDBService.obtenerConID(idmascota).then((data:any)=>{
			if(data.result){
				this.mascotaModel = data.mascota;
				console.log(this.mascotaModel);
				this.obtenerDuenoConID(this.mascotaModel.iddueno);
				this.MzToastService.show(data.mensajes,2000,'green');
			} else {
				this.MzToastService.show(data.errores,4000,'red');
			}
		},(dataError:any)=>{
			this.MzToastService.show(dataError.errores,4000,'red');
		});
	}

	public obtenerDuenoConID(iddueno:number){
		console.log("obtenerDuenoConID",iddueno);
		this.DuenoLocalDBService.obtenerConID(iddueno).then((data:any)=>{
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

	private modificar():void {
		console.warn("Sin Implementar aún");
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
