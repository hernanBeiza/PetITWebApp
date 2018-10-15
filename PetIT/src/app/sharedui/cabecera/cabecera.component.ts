import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { HiperMenuService } from './../hipermenu/HiperMenu.service';

import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit, OnDestroy {

	@Input() secciones:Array<any>;

	public titulo: string;
	public bajada: string;
	public subscription: Subscription;

	constructor(private HiperMenuService:HiperMenuService,
		private LocationStrategy:LocationStrategy,
		private Router:Router) { 
		this.subscription = this.HiperMenuService.getMenuEventEmitter().subscribe(seccion => this.seccionSeleccionada(seccion));
	}

	ngOnInit() { 
		console.log("ngOnInit();");
		/*
    	this.Router.events.subscribe((event:Event) => {
    		if(event instanceof NavigationEnd){
	    		//console.log(event);
	    		if(this.LocationStrategy.path().length>4){
			        //console.log(this.LocationStrategy.path());
			        let elementos = this.LocationStrategy.path().split("/");
			        elementos.pop();
			        elementos.shift();
			        console.log(elementos);
			        var seccion:string = "";
			        for (var i = 0; i < elementos.length; i++) {
			        	let url=elementos[i];
			        	console.log(url);
			        	// code...
			        	seccion.concat(url);
			        	//seccion.concat("/");
			        }
			        console.log(seccion);
	    		}
    		}
	    });
	    */
	}

	seccionSeleccionada(seccion:any) {
		console.log("seccionSeleccionada();");
		//console.log(seccion);
		this.titulo = seccion.titulo;
		this.bajada = seccion.bajada;
	}

	ngOnDestroy() {
		console.log("ngOnDestroy();");
		this.subscription.unsubscribe();
	}


}