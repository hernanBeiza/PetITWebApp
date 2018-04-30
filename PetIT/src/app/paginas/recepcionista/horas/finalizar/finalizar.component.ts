import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CitaLocalDBService } from './../../../../services/CitaLocalDB.service';
import { MzToastService } from 'ng2-materialize';

import {DuenoModel} from './../../../../models/DuenoModel';
import {EspecialidadModel} from './../../../../models/EspecialidadModel';
import {EspecialistaModel} from './../../../../models/EspecialistaModel';
import {FechaModel} from './../../../../models/FechaModel';
import {HoraModel} from './../../../../models/HoraModel';

import {CitaModel} from './../../../../models/CitaModel';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.css']
})
export class FinalizarComponent implements OnInit {

public cita:CitaModel = new CitaModel();

  constructor(private CitaLocalDBService:CitaLocalDBService, private ActivatedRoute:ActivatedRoute, 
  	private MzToastService:MzToastService) { }

	ngOnInit(){
	    this.ActivatedRoute.params.subscribe((param: any) => {
			let idcita = param['idcita'];
			if(idcita != undefined || idcita == "undefined"){
				this.CitaLocalDBService.obtenerConID(idcita).then((data:any)=>{
					console.log(data);
					if(data.result){
						this.cita = data.cita;
					} else {
						this.MzToastService.show(data.errores,5000,"red");
					}
				},(dataError:any)=>{
					this.MzToastService.show(dataError.errores,5000,"red");
				});
			} else {
				this.MzToastService.show("No hay id de dueno.",5000,"red");
			}
		});
	}

}
