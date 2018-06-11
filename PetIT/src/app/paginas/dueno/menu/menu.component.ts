import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LocalDBService } from './../../../services/LocalDB.service';
import { UsuarioLocalDBService } from './../../../services/UsuarioLocalDB.service';

import { UsuarioModel } from './../../../models/UsuarioModel';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	constructor(private router:Router,
		private LocalDBService:LocalDBService, 
		private UsuarioLocalDBService:UsuarioLocalDBService) { }

	ngOnInit() { 
		//console.log("MenuComponent");
	}

	public irRuta(ruta:String):void {
		console.log("irRuta");
	    this.router.navigate([ruta]);
	}

	public cerrarSesion():void {
	  	console.log("cerrarSesion");
	  	this.UsuarioLocalDBService.borrarLocal();
	    this.router.navigate(['/login']);
	    console.warn("Falta terminar: Llamar al backend");
	}

	public irAgendar(): void {
		console.log("irAgendar();");
		console.warn("Sin implementar");
		let usuario:UsuarioModel = this.UsuarioLocalDBService.obtenerLocal();
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
