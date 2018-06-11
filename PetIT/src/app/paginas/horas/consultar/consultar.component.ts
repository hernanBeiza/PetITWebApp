import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { MzToastService } from 'ng2-materialize';

import {DuenoLocalDBService} from './../../../services/DuenoLocalDB.service';
import {EspecialidadLocalDBService} from './../../../services/EspecialidadLocalDB.service';
import {CitaLocalDBService} from './../../../services/CitaLocalDB.service';

import {DuenoModel} from './../../../models/DuenoModel';
import {MascotaModel} from './../../../models/MascotaModel';

import {CitaModel} from './../../../models/CitaModel';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

	public buscarForm:FormGroup;
	public stringControl:AbstractControl;
	public fieldControl:AbstractControl;

	public citas:Array<CitaModel> = new Array<CitaModel>();

	public filtroString: string = ""
	public filtroField: string = "rut";

	constructor(private router:Router, 
	    private fb:FormBuilder,
	    private MzToastService:MzToastService,
	    private CitaLocalDBService:CitaLocalDBService) { 

		this.buscarForm = this.fb.group({
			'filtroString': [this.filtroString, Validators.compose([Validators.required])],
			'filtroField': [this.filtroField, Validators.compose([Validators.required])],
		});

		this.stringControl = this.buscarForm.controls['filtroString'];
		this.fieldControl = this.buscarForm.controls['filtroField'];
	}

	ngOnInit() {
		console.log("ConsultarComponent");
	}


	public onSubmit(values:Object):void {
	    if (this.buscarForm.valid) {
	      if(this.filtroField=="nombre"){
	        this.buscarConNombre();
	      } else {
	        this.buscarConRut();
	      }
	    }
	}

	private buscarConNombre(): void {

	}

	private buscarConRut(): void {
		this.CitaLocalDBService.obtenerConRut(this.filtroString).then((data:any)=>{
			console.log(data);
			if(data.result){
			this.citas = data.citas;
			this.MzToastService.show(data.mensajes,3000,'green');
			} else {
			this.MzToastService.show(data.errores,5000,'red');
			}
		},(dataError:any)=>{
			console.error(dataError);
			this.MzToastService.show(dataError.errores,5000,'red');
		});
	}

	public irModificar(cita:CitaModel): void {
		console.warn("Sin Terminar",cita);
		let ruta:string = "recepcionistas/horas/modificar/"+cita.idcita;
		//this.router.navigate([ruta]);
		console.log(ruta);
	}

	public anular(cita:CitaModel): void {
		console.warn("Sin Terminar",cita);
	}
}
