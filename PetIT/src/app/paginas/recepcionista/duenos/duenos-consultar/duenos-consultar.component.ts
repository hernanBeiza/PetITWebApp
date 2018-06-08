import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

import { Mensajes } from './../../../../libs/Mensajes';

import { DuenoLocalDBService } from './../../../../services/DuenoLocalDB.service';

import { RutValidator } from 'ng2-rut';

import { DuenoModel } from './../../../../models/DuenoModel';

@Component({
  selector: 'app-duenos-consultar',
  templateUrl: './duenos-consultar.component.html',
  styleUrls: ['./duenos-consultar.component.css']
})
export class DuenosConsultarComponent implements OnInit {

	public duenos:Array<DuenoModel>;

	constructor(private router:Router, private fb:FormBuilder, private activatedRoute: ActivatedRoute, 
	    private MzToastService:MzToastService,
	    private DuenoLocalDBService:DuenoLocalDBService) { }

	ngOnInit() {
		this.cargar();
	}

	public cargar():void {
		this.DuenoLocalDBService.obtener().then((data:any)=>{
			if(data.result){
				this.duenos = data.duenos;
				this.MzToastService.show(data.errores,5000,'green');
			} else {
				this.MzToastService.show(data.errores,5000,'red');
			}
		},(dataError:any)=>{
			this.MzToastService.show(dataError.errores,5000,'red');
		});
	}


	public irModificar(dueno:DuenoModel): void {
		this.router.navigate(["/recepcionista/duenos/modificar/"+dueno.iddueno]);
	}

	public irRegistrarMascota(dueno:DuenoModel): void {
		this.router.navigate(["/recepcionista/mascotas/registrar/"+dueno.iddueno]);
	}

	public irAgregarUsuario(dueno:DuenoModel): void {
		console.log("irAgregarUsuario",dueno);
		//this.router.navigate(["/recepcionista/usuarios/agregar/"+dueno.iddueno]);
	}

}