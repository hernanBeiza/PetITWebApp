import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MzToastService } from 'ngx-materialize';

// Services
import { CitaLocalDBService } from './../../../services/CitaLocalDB.service';
// Models
import {DuenoMascotaModel} from './../../../models/DuenoMascotaModel';
import {EspecialidadModel} from './../../../models/EspecialidadModel';
import {EspecialistaModel} from './../../../models/EspecialistaModel';
import {CitaModel} from './../../../models/CitaModel';

@Component({
  selector: 'app-horas-finalizar',
  templateUrl: './horas-finalizar.component.html',
  styleUrls: ['./horas-finalizar.component.css']
})
export class HorasFinalizarComponent implements OnInit {

	public citaModel:CitaModel = new CitaModel();

	constructor(private CitaLocalDBService:CitaLocalDBService, 
		private ActivatedRoute:ActivatedRoute, 
  		private MzToastService:MzToastService) { }

	ngOnInit(){
	    this.ActivatedRoute.params.subscribe((param: any) => {
			let idcita = param['idcita'];
			if(idcita != undefined || idcita == "undefined"){
				this.obtenerCita(idcita);
			} else {
				this.MzToastService.show("No hay id de cita.",5000,"red");
			}
		});
	}

	private obtenerCita(idcita:number):void {
		this.CitaLocalDBService.obtenerConID(idcita).then((data:any)=>{
			console.info(data);
			if(data.result){
				this.citaModel = data.cita;
			} else {
				this.MzToastService.show(data.errores,5000,"red");
			}
		},(dataError:any)=>{
			this.MzToastService.show(dataError.errores,5000,"red");
		});
	}

}