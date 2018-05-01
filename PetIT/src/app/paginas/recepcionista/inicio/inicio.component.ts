import { Component, OnInit } from '@angular/core';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

import {CitaLocalDBService} from './../../../services/CitaLocalDB.service';


import {CitaModel} from './../../../models/CitaModel';
import {DuenoModel} from './../../../models/DuenoModel';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
	public citas:Array<CitaModel> = new Array<CitaModel>();

  constructor(private CitaLocalDBService:CitaLocalDBService,
  	private MzToastService:MzToastService) { }

  ngOnInit() {
  	this.CitaLocalDBService.obtener().then((data:any) =>{
  		if(data.result){
	  		this.MzToastService.show(data.mensajes,5000,'green');
	  		this.citas = data.citas;
  		} else {
	  		this.MzToastService.show(data.errores,5000,'red');
  		}
  	},(dataError:any)=>{
  		this.MzToastService.show(dataError.errores,5000,'red');
  	});

  }

}
