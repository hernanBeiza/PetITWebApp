import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MzSidenavCollapsibleComponent } from 'ngx-materialize';

import { LocalDBService } from './../../services/LocalDB.service';
import { UsuarioLocalDBService } from './../../services/UsuarioLocalDB.service';

import { HiperMenuService } from './HiperMenu.service';

import { UsuarioModel } from './../../models/UsuarioModel';

import { secciones } from './../../app.secciones';

@Component({
	selector: 'app-hiper-menu',
	templateUrl: './hipermenu.component.html',
	styleUrls: ['./hipermenu.component.css']
})
export class HiperMenuComponent implements OnInit {

	public usuario:UsuarioModel;
	public rol:string = "";
	public secciones:Array<any> = new Array<any>();
	@ViewChild('menu') menuComponent: MzSidenavCollapsibleComponent;

	constructor(private router:Router,
		private LocalDBService:LocalDBService, 
		private UsuarioLocalDBService:UsuarioLocalDBService,
		private HiperMenuService:HiperMenuService) { }

	ngOnInit() { 
		let encontrada = this.buscarSeccionPorUrl(this.router.url);
		this.irSeccion(encontrada);
		this.usuario = this.UsuarioLocalDBService.obtenerLocal();
		if(this.usuario!=null){
			switch (this.usuario.idrol) {
				case 1:
					this.rol = "Dueño de Veterinaria";
					this.secciones = secciones.admin;
				break;
				case 2:
					this.rol = "Recepcionista";	
					this.secciones = secciones.recepcionista;
				break;
				case 3:
					this.rol = "Dueño de Mascota";	
					this.secciones = secciones.dueno;
				break;
				default:
					// code...
					break;
			}
		} else {
			console.warn("No existe usuario, ir al login");
			this.router.navigate["/login"];
		}
	}

	buscarSeccionPorUrl(url:string){
		for (var i = 0;i<this.secciones.length;i++) {
			let seccion = this.secciones[i];
			//console.log(seccion.link,url);
			if(seccion.link==url){
				//console.log("encontrada!");
				return seccion;
			}
		}
	}

	irSeccion(seccion:any){
		//console.log("irSeccion");
		if(seccion){		
			//console.log(seccion);
			if(seccion.link){
				this.deseleccionarTodas();
				seccion.seleccionada = true;
				//console.log(seccion.link);
			    // Enviar datos de la sección a quienes la quieran recibir
			    this.HiperMenuService.enviar(seccion);
				if(seccion.link=="/login"){
					this.UsuarioLocalDBService.borrarLocal();
				}
				this.router.navigate([seccion.link]);
			}
		}
	}

	deseleccionarTodas():void {
		for (var i = 0; i < this.secciones.length; i++) {
			var seccion:any = this.secciones[i];
			seccion.seleccionada = false;
		}
	}

}
