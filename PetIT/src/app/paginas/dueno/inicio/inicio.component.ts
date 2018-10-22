import { Component, OnInit } from '@angular/core';

import { CitaLocalDBService } from './../../../services/CitaLocalDB.service';
import { DuenoMascotaLocalDBService } from './../../../services/DuenoMascotaLocalDB.service';
import { UsuarioLocalDBService } from './../../../services/UsuarioLocalDB.service';

import { CitaModel } from './../../../models/CitaModel';
import { UsuarioModel } from './../../../models/UsuarioModel';
import { DuenoMascotaModel } from './../../../models/DuenoMascotaModel';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

	private usuario:UsuarioModel;
	private dueno:DuenoMascotaModel;

	public citas:Array<CitaModel>;

	constructor(private UsuarioLocalDBService:UsuarioLocalDBService,
		private DuenoMascotaLocalDBService:DuenoMascotaLocalDBService,
		private CitaLocalDBService:CitaLocalDBService) { }

	ngOnInit() {
		this.usuario = this.UsuarioLocalDBService.obtenerLocal();
			if(this.usuario){
			this.DuenoMascotaLocalDBService.obtenerConIDUsuario(this.usuario.idusuario).then((data:any)=>{
				if(data.result){
					this.dueno = data.dueno;
					this.cargarUltimas();
				} else {
					console.error(data.errores);
				}
			},(dataError:any)=>{
				console.error(dataError);
			});
		}
	}

	public cargarUltimas(){

		this.CitaLocalDBService.obtenerUltimasDeDueno(this.dueno).then((data:any)=>{
			console.log(data);
			if(data.result){
				this.citas = data.citas;
			}
		},(dataError:any)=>{
			console.error(dataError);

		});
		
	}

}
