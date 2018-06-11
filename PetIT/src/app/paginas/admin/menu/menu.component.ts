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

	constructor(private router:Router,private LocalDBService:LocalDBService, private UsuarioLocalDBService:UsuarioLocalDBService) { }

	ngOnInit() { }

	public irRuta(ruta:String):void {
	    this.router.navigate([ruta]);
	}

	public cerrarSesion():void {
	  	console.log("cerrarSesion");
	    this.UsuarioLocalDBService.borrarLocal();
	    this.router.navigate(['/login']);
	    console.info("Llamar al backend");
	}

}
