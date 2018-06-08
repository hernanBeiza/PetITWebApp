import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LocalDBService } from './../../../services/LocalDB.service';
import { UsuarioService } from './../../../services/Usuario.service';

import { UsuarioModel } from './../../../models/UsuarioModel';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	constructor(private router:Router,
		private LocalDBService:LocalDBService, 
		private UsuarioService:UsuarioService) { }

	ngOnInit() { 
		//console.log("MenuComponent");
	}

	public irRuta(ruta:String):void {
		console.log("irRuta");
	    this.router.navigate([ruta]);
	}

	public cerrarSesion():void {
	  	console.log("cerrarSesion");
	  	this.UsuarioService.borrarLocal();
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

	public irAgendar(): void {
		console.log("irAgendar();");
		console.warn("Sin implementar");
		let usuario:UsuarioModel = this.UsuarioService.obtenerLocal();
		console.log(usuario);
		let ruta:string = '/dueno/agendar/'+usuario.idusuario;
		console.log(ruta);
	}

	public irConsultar(): void {
		console.log("irConsultar");
		console.warn("Sin implementar");
	}

	public closeFunctionCallback():void {
		//console.log("closeFunctionCallback();");
	}

	public openFunctionCallback(): void {
		//console.log("openFunctionCallback();");
	}

}
