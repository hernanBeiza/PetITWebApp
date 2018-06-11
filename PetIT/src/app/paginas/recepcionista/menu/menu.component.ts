import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LocalDBService } from './../../../services/LocalDB.service';
import { UsuarioLocalDBService } from './../../../services/UsuarioLocalDB.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	constructor(private router:Router, 
		private LocalDBService:LocalDBService, 
		private UsuarioLocalDBService:UsuarioLocalDBService) { }

	ngOnInit() { }

	public irRuta(ruta:String):void {
	    this.router.navigate([ruta]);
	}

	public cerrarSesion():void {
	  	console.log("cerrarSesion");
	    this.UsuarioLocalDBService.borrarLocal();
	    this.router.navigate(['/login']);
	    console.warn("Sin terminar: Falta llamar al backend");
	  	//TODO
	  	//Llamar al backend
	  	/*
	    this.UsuarioService.logout().subscribe(
	      data => {            
	        var datos:any = data as any;
	      	//console.info(datos);
	        this.LocalDBService.borrarTodo();
	      	this.mostrarme = false;
	        this.router.navigate(['/login']);
	      },
	      error => {
	        console.error(error);
	        this.LocalDBService.borrarTodo();
	      	this.mostrarme = false;
	        this.router.navigate(['/login']);
	    });
	    */
	}

	public closeFunctionCallback():void {
		//console.log("closeFunctionCallback();");
	}

	public openFunctionCallback(): void {
		//console.log("openFunctionCallback();");
	}

}
