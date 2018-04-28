import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

import {DuenoLocalDBService} from './../../../../services/DuenoLocalDB.service';
import {EspecialidadLocalDBService} from './../../../../services/EspecialidadLocalDB.service';
import {CitaLocalDBService} from './../../../../services/CitaLocalDB.service';

import {EspecialidadModel} from './../../../../models/EspecialidadModel';
import {EspecialistaModel} from './../../../../models/EspecialistaModel';
import {FechaModel} from './../../../../models/FechaModel';
import {HoraModel} from './../../../../models/HoraModel';

import {CitaModel} from './../../../../models/CitaModel';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

	constructor(private router:Router, 
	    private MzToastService:MzToastService,
	    private CitaLocalDBService:CitaLocalDBService) { }

	ngOnInit() {
		console.log("ConsultarComponent");
	}

}
