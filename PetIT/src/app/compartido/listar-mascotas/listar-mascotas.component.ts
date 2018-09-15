import { Component, OnInit, Input, Output } from '@angular/core';

import { MzToastService } from 'ng2-materialize';
import { EventEmitter } from '@angular/core';

// Services
import {MascotaLocalDBService} from './../../services/MascotaLocalDB.service';
import {DuenoMascotaLocalDBService} from './../../services/DuenoMascotaLocalDB.service';
import {EspecialidadLocalDBService} from './../../services/EspecialidadLocalDB.service';
import {EspecialistaLocalDBService} from './../../services/EspecialistaLocalDB.service';
import {HoraLocalDBService} from './../../services/HoraLocalDB.service';
import {CitaLocalDBService} from './../../services/CitaLocalDB.service';

import {UsuarioModel} from './../../models/UsuarioModel';
import {DuenoMascotaModel} from './../../models/DuenoMascotaModel';
import {MascotaModel} from './../../models/MascotaModel';

@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.component.html',
  styleUrls: ['./listar-mascotas.component.css']
})
export class ListarMascotasComponent implements OnInit {

	@Output() mascotaSeleccionadaEmitter: EventEmitter<MascotaModel> = new EventEmitter();

	public mascotas:Array<MascotaModel> = new Array<MascotaModel>();
	public mascotaSeleccionada:MascotaModel;

	constructor(private MzToastService:MzToastService,
	    private MascotaLocalDBService:MascotaLocalDBService,
	    private DuenoMascotaLocalDBService:DuenoMascotaLocalDBService) { }

	ngOnInit() { }

	public buscarMascotasConDueno(dueno:DuenoMascotaModel):void {
	    this.MascotaLocalDBService.obtenerConDueno(dueno).then((data:any)=>{
			console.log(data);
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

	public seleccionarMascota(model:MascotaModel): void {
	    console.warn("seleccionarMascota");
	    console.log(model);
	    this.mascotaSeleccionada = model;
	    this.mascotaSeleccionadaEmitter.emit(model);
	}

	public irEditar(mascota:MascotaModel):void {
	    console.warn("irEditar:", mascota);
		//this.router.navigate(['/recepcionista/horas/agendar/'+this.duenoEncontrado.rutdueno+'/'+this.mascotaSeleccionada.rutmascota]);        
	}


}