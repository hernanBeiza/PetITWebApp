import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { LocationStrategy } from '@angular/common';

import { UsuarioLocalDBService } from './../../services/UsuarioLocalDB.service';

import { UsuarioModel } from './../../models/UsuarioModel';

import { secciones } from './../../app.secciones';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit, OnDestroy {

	//@Input() secciones:Array<any>;

	public titulo: string;
	public bajada: string;

	private secciones:Array<any>;
	private usuario:UsuarioModel;

	constructor(private LocationStrategy:LocationStrategy, private Router:Router, 
		private UsuarioLocalDBService:UsuarioLocalDBService) { 

		this.usuario = this.UsuarioLocalDBService.obtenerLocal();
		if(this.usuario!=null){
			switch (this.usuario.idrol) {
				case 1:
					this.secciones = secciones.admin;
				break;
				case 2:
					this.secciones = secciones.recepcionista;
				break;
				case 3:
					this.secciones = secciones.dueno;
				break;
			}
		}

		this.buscarSeccion();
	}

	ngOnInit() { 
		console.log("ngOnInit();");
    	this.Router.events.subscribe((event:Event) => {
    		if(event instanceof NavigationEnd){
	    		//console.log(event);
	    		if(this.LocationStrategy.path().length>4){
	    			this.buscarSeccion();
	    		}
    		}
	    });
	}

	private obtenerSeccionActual(): string {
		var actual = this.LocationStrategy.path();
        var elementos = actual.split("/");
        elementos.shift();
        //Para secciones más largas. Eliminar el último parámetro variable
        //Problema si la ruta es más larga
        for (var i = 0; i < elementos.length; i++) {
        	if(elementos.length>3){
		        elementos.pop();        		
        	}
        }
        
        var seccionActual:string = "/";
        for (var i = 0; i < elementos.length; i++) {
	    	seccionActual = seccionActual.concat(elementos[i]);
        	if(i<elementos.length-1){
	        	seccionActual = seccionActual.concat("/");
        	}
        }
        return seccionActual;
	}

	private buscarSeccion(): void {
		let actual = this.obtenerSeccionActual();

        for (var i = 0; i < this.secciones.length; ++i) {
        	let seccion:any = this.secciones[i];
        	//console.log(actual,seccion.link);
        	if(seccion.link == actual){
        		this.titulo = seccion.titulo;
        		this.bajada = seccion.bajada;
        		break;
        	}
        }

	}

	ngOnDestroy() {
		console.log("ngOnDestroy();");
	}

}