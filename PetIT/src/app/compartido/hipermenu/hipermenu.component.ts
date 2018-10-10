import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MzSidenavCollapsibleComponent } from 'ng2-materialize';

import { LocalDBService } from './../../services/LocalDB.service';
import { UsuarioLocalDBService } from './../../services/UsuarioLocalDB.service';

import { HiperMenuService } from './HiperMenu.service';

import { UsuarioModel } from './../../models/UsuarioModel';
@Component({
	selector: 'app-hiper-menu',
	templateUrl: './hipermenu.component.html',
	styleUrls: ['./hipermenu.component.css']
})
export class HiperMenuComponent implements OnInit {

	public usuario:UsuarioModel;
	public rol:string = "";
	@Input() secciones:Array<any>;
	@ViewChild('menu') menuComponent: MzSidenavCollapsibleComponent;

	constructor(private router:Router,
		private LocalDBService:LocalDBService, private UsuarioLocalDBService:UsuarioLocalDBService,
		private HiperMenuService:HiperMenuService) { }

	ngOnInit() { 
		console.log(this.router.url);
		let encontrada = this.buscarSeccionPorUrl(this.router.url);
		this.irSeccion(encontrada);

		this.usuario = this.UsuarioLocalDBService.obtenerLocal();
		switch (this.usuario.idrol) {
			case 1:
				this.rol = "Dueño de Veterinaria";
			break;
			case 2:
				this.rol = "Recepcionista";	
			break;
			case 3:
				this.rol = "Dueño de Mascota";	
			break;
			default:
				// code...
				break;
		}
	}

	buscarSeccionPorUrl(url:string){
		for (var i = 0;i<this.secciones.length;i++) {
			let seccion = this.secciones[i];
			console.log(seccion.link,url);
			if(seccion.link==url){
				console.log("encontrada!");
				return seccion;
			}
		}
	}

	irSeccion(seccion:any){
		console.log("irSeccion");
		console.log(seccion);
		if(seccion.link){
			// console.log(seccion.link);
		    // Enviar datos de la sección a quienes la quieran recibir
		    this.HiperMenuService.enviar(seccion);
			if(seccion.link=="/login"){
				this.UsuarioLocalDBService.borrarLocal();
			}
			this.router.navigate([seccion.link]);		
		}
	}

}
