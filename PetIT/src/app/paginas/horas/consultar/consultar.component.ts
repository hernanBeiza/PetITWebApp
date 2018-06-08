import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

	public citas:Array<CitaModel> = new Array<CitaModel>();

	public filtroString: string = ""
	public filtroField: string = "rut";

	constructor(private router:Router, 
	    private MzToastService:MzToastService,
	    private CitaLocalDBService:CitaLocalDBService) { }

	ngOnInit() {
		console.log("ConsultarComponent");
		this.cargarHoras();
	}

	public cargarHoras(): void {
		this.CitaLocalDBService.obtener().then((data:any)=>{
			console.log(data);
			if(data.result){
				this.citas = data.citas;
				this.MzToastService.show(data.mensajes,3000,"green");
			} else {
				this.MzToastService.show(data.errores,5000,"red");
			}
		},(dataError:any)=>{	
			this.MzToastService.show(dataError.errores,5000,"red");
		});
	}

	public onSearchChange(texto:string): void {
		console.warn("Sin Implementar");
		if(this.filtroField=="nombre"){

		} else {

		}		
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
