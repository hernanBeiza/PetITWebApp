import { Component, OnInit, Input, Output } from '@angular/core';

import { MzToastService } from 'ng2-materialize';
import { EventEmitter } from '@angular/core';

// Services
import {MascotaLocalDBService} from './../../../services/MascotaLocalDB.service';

import {DuenoMascotaModel} from './../../../models/DuenoMascotaModel';
import {MascotaModel} from './../../../models/MascotaModel';

@Component({
  selector: 'app-mascotas-listar',
  templateUrl: './mascotas-listar.component.html',
  styleUrls: ['./mascotas-listar.component.css']
})
export class MascotasListarComponent implements OnInit {

	@Output() mascotaSeleccionadaEmitter: EventEmitter<MascotaModel> = new EventEmitter();
	@Output() mascotaEditarEmitter: EventEmitter<MascotaModel> = new EventEmitter();

	public mascotas:Array<MascotaModel> = new Array<MascotaModel>();
	public mascotaSeleccionada:MascotaModel;

	constructor(private MzToastService:MzToastService,
	    private MascotaLocalDBService:MascotaLocalDBService) { }

	ngOnInit() { }

	public buscarMascotasConDueno(dueno:DuenoMascotaModel):void {
	    this.MascotaLocalDBService.obtenerConDueno(dueno).then((data:any)=>{
			console.info(data);
			if(data.result){
				this.mascotas = data.mascotas;
		        this.MzToastService.show(data.mensajes,3000,'green');
			} else {
				this.MzToastService.show(data.errores,5000,'red');
			}
	    },(dataError:any)=>{
			console.warn(dataError);
			this.MzToastService.show(dataError.errores,5000,'red');
	    });
	}

	public onPageChange(page:number): void {
		console.info("onPageChange");
		console.log(page);
	}

	public seleccionarMascota(mascota:MascotaModel): void {
	    //console.info("seleccionarMascota");
	    //console.log(mascota);
	    this.mascotaSeleccionada = mascota;
	    this.mascotaSeleccionadaEmitter.emit(mascota);
	}

	public irEditar(mascota:MascotaModel):void {
	    console.info("irEditar:", mascota);
	    this.mascotaEditarEmitter.emit(mascota);
	}


}