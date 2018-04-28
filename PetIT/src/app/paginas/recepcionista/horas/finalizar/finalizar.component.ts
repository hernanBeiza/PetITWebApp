import { Component, OnInit } from '@angular/core';

import {CitaLocalDBService} from './../../../../services/CitaLocalDB.service';

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

  constructor(private CitaLocalDBService:CitaLocalDBService) { }

  ngOnInit(){
  	let citas:Array<CitaModel> =this.CitaLocalDBService.obtenerVarios();
  	this.cita = citas[citas.length-1];
  	console.log(this.cita);
  }

}
