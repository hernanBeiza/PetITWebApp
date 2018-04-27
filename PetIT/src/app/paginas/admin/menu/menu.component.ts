import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LocalDBService } from './../../../services/LocalDB.service';
import { UsuarioService } from './../../../services/Usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	constructor(private router:Router,private LocalDBService:LocalDBService, private UsuarioService:UsuarioService) { }

	ngOnInit() { 
		console.log("MenuComponent");
	}

	public irRuta(ruta:String):void {
		console.log("irRuta");
	    this.router.navigate([ruta]);
	}

	public cerrarSesion():void {
	  	console.log("cerrarSesion");
	    this.LocalDBService.borrarTodo();
	    this.router.navigate(['/login']);
	  	//TODO
	  	//Llmar al backend
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

}
