import { Component, OnInit, Input } from '@angular/core';

import { HiperMenuService } from './../../services/HiperMenu.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

	public titulo: string;
	public bajada: string;

	constructor(private HiperMenuService:HiperMenuService) { 
		//console.log("CabeceraComponent");
	    this.HiperMenuService.seccionEmmiter.subscribe(seccion => {
	    	console.log(seccion);
	    	this.titulo = seccion.titulo;
	    	this.bajada = seccion.bajada;
	    });
	}

	ngOnInit() {

	}

}