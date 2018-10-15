import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LocalDBService } from './../../services/LocalDB.service';
import { UsuarioLocalDBService } from './../../services/UsuarioLocalDB.service';


import { UsuarioModel } from './../../models/UsuarioModel';
@Component({
	selector: 'boton-volver',
	templateUrl: './boton-volver.component.html',
	styleUrls: ['./boton-volver.component.css']
})
export class BotonVolverComponent implements OnInit {

	public usuario:UsuarioModel;
	public rol:string = "";

	constructor(private router:Router,private location:Location,
		private LocalDBService:LocalDBService, 
		private UsuarioLocalDBService:UsuarioLocalDBService) { 
	}

	ngOnInit() { }

	onVolver(){
		console.log("onVolver");
	    this.location.back();
	}

}
