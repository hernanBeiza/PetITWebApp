import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MzSidenavCollapsibleComponent } from 'ng2-materialize';

import { LocalDBService } from './../../services/LocalDB.service';
import { UsuarioLocalDBService } from './../../services/UsuarioLocalDB.service';

import { HiperMenuService } from './../../services/HiperMenu.service';

@Component({
	selector: 'app-hiper',
	templateUrl: './hipermenu.component.html',
	styleUrls: ['./hipermenu.component.css']
})
export class HiperMenuComponent implements OnInit {

	@Input() secciones:Array<any>;
	@ViewChild('menu') menuComponent: MzSidenavCollapsibleComponent;

	constructor(private router:Router,
		private LocalDBService:LocalDBService, private UsuarioLocalDBService:UsuarioLocalDBService,
		private HiperMenuService:HiperMenuService) { 
	}

	ngOnInit() {
		console.log(this.secciones);
		console.log(this.secciones[0]);
		//Cargar la primera sección
	    this.HiperMenuService.enviar(this.secciones[0]);
	}

	irSeccion(seccion:any){
		console.log("irSeccion");
		console.log(seccion);

		if(seccion.link){
			console.log(seccion.link);
		    // Enviar datos de la sección a quienes la quieran recibir
		    this.HiperMenuService.enviar(seccion);
			if(seccion.link=="/login"){
				this.UsuarioLocalDBService.borrarLocal();
			}
			this.router.navigate([seccion.link]);		
		}

	}

}
