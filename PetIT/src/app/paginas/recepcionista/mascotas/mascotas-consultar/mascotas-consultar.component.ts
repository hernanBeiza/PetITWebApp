import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

import { Mensajes } from './../../../../libs/Mensajes';

import { MascotaLocalDBService } from './../../../../services/MascotaLocalDB.service';

import { RutValidator } from 'ng2-rut';

import { DuenoModel } from './../../../../models/DuenoModel';
import { MascotaModel } from './../../../../models/MascotaModel';

@Component({
  selector: 'app-mascotas-consultar',
  templateUrl: './mascotas-consultar.component.html',
  styleUrls: ['./mascotas-consultar.component.css']
})
export class MascotasConsultarComponent implements OnInit {

	public mascotas:Array<MascotaModel>;

	constructor(private router:Router, private fb:FormBuilder, private ActivatedRoute: ActivatedRoute, 
	    private MzToastService:MzToastService,
	    private MascotaLocalDBService:MascotaLocalDBService) { }

	ngOnInit() {
		this.cargar();
	}

	public cargar():void {
		this.MascotaLocalDBService.obtener().then((data:any)=>{
			if(data.result){
				this.mascotas = data.mascotas;
				this.MzToastService.show(data.errores,5000,'green');
			} else {
				this.MzToastService.show(data.errores,5000,'red');
			}
		},(dataError:any)=>{
			this.MzToastService.show(dataError.errores,5000,'red');
		});
	}

	public irModificar(mascota:MascotaModel): void {
		this.router.navigate(["/recepcionista/mascotas/modificar/"+mascota.rutmascota]);
	}

}
