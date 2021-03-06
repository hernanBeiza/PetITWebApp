import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { MzToastService } from 'ngx-materialize';

import {UsuarioLocalDBService} from './../../../../services/UsuarioLocalDB.service';
import {DuenoMascotaLocalDBService} from './../../../../services/DuenoMascotaLocalDB.service';
import {MascotaLocalDBService} from './../../../../services/MascotaLocalDB.service';
import {EspecialidadLocalDBService} from './../../../../services/EspecialidadLocalDB.service';
import {CitaLocalDBService} from './../../../../services/CitaLocalDB.service';

import {UsuarioModel} from './../../../../models/UsuarioModel';
import {DuenoMascotaModel} from './../../../../models/DuenoMascotaModel';
import {MascotaModel} from './../../../../models/MascotaModel';

import {CitaModel} from './../../../../models/CitaModel';

import { MascotasListarComponent} from '../../../../compartido/mascotas/mascotas-listar/mascotas-listar.component';

@Component({
  selector: 'app-horas-consultar',
  templateUrl: './horas-consultar.component.html',
  styleUrls: ['./horas-consultar.component.css']
})
export class HorasConsultarComponent implements OnInit {

	@ViewChild('mascotasListarComponent') mascotasListarComponent: MascotasListarComponent;

	public buscarForm:FormGroup;
	public stringControl:AbstractControl;
	public fieldControl:AbstractControl;

	public duenos:Array<DuenoMascotaModel> = new Array<DuenoMascotaModel>();

	public filtroString: string = ""
	public filtroField: string = "rut";

	public duenoSeleccionado:DuenoMascotaModel;
	public mascotaSeleccionada:MascotaModel;
	
	public usuarioModel:UsuarioModel;

	constructor(private router:Router, 
	    private fb:FormBuilder,
	    private MascotaLocalDBService:MascotaLocalDBService,
	    private DuenoMascotaLocalDBService:DuenoMascotaLocalDBService,
	    private MzToastService:MzToastService,
	    private UsuarioLocalDBService:UsuarioLocalDBService) { 
		console.log("ConsultarComponent");

		this.buscarForm = this.fb.group({
        	'filtroString': [this.filtroString, Validators.compose([Validators.required])],
	        'filtroField': [this.filtroField, Validators.compose([Validators.required])],
		});
		this.stringControl = this.buscarForm.controls['filtroString'];
		this.fieldControl = this.buscarForm.controls['filtroField'];

	}


	ngOnInit() { 
		this.usuarioModel = this.UsuarioLocalDBService.obtenerLocal();
		if(this.usuarioModel){
		} else {
			console.warn("No existe usuario, ir al login");
		}
	}

	public onSubmit(values:Object):void {
	    if (this.buscarForm.valid) {
	      if(this.filtroField=="nombre"){
	        this.buscarConNombre();
	      } else {
	        this.buscarConRut();
	      }
	    }
	}
	  
	public onPageChange(pagina:number): void {
	    console.log(pagina);
	}

	private limpiar():void {
		this.duenos = new Array<DuenoMascotaModel>();
		this.duenoSeleccionado = null;
		this.mascotasListarComponent.limpiar();
	}

	private buscarConNombre(): void {
		this.limpiar();

	    this.DuenoMascotaLocalDBService.obtenerConNombreApellido(this.filtroString).then((data:any)=>{
			console.log(data);
			if(data.result){
				this.duenos.push(data.dueno);
				/*
				this.duenoEncontrado = data.dueno;
				this.obtenerMascotasConDueno(data.dueno);
				*/
				this.MzToastService.show(data.mensajes,3000,'green');
			} else {
				//this.duenoEncontrado = new DuenoMascotaModel();
				this.MzToastService.show(data.errores,5000,'red');
			}
	    },(dataError:any)=>{
			console.warn(dataError);
			//this.duenoEncontrado = new DuenoMascotaModel();
			this.MzToastService.show(dataError.errores,5000,'red');
	    });
	}

	private buscarConRut(): void {
		this.limpiar();

	    this.DuenoMascotaLocalDBService.obtenerConRut(this.filtroString).then((data:any)=>{
			console.log(data);
			if(data.result){
				this.duenos.push(data.dueno);	
				/*
	        	this.duenoEncontrado = data.dueno;
				this.obtenerMascotasConDueno(data.dueno);
				*/
		        this.MzToastService.show(data.mensajes,3000,'green');
			} else {
				//this.duenoEncontrado = new DuenoMascotaModel();
	        	this.MzToastService.show(data.errores,5000,'red');
			}
	    },(dataError:any)=>{
			console.warn(dataError);
			//this.duenoEncontrado = new DuenoMascotaModel();
			this.MzToastService.show(dataError.errores,5000,'red');
	    });
	}

	public seleccionarDueno(model:DuenoMascotaModel): void {
		this.duenoSeleccionado = model;
		this.obtenerMascotasConDueno(model);
	}

	private obtenerMascotasConDueno(model:DuenoMascotaModel): void {
		this.mascotasListarComponent.buscarMascotasConDueno(model);
	}

	//Métodos del listado de mascotas
	public onMascotaSeleccionada(mascota:MascotaModel): void {
		console.log("onMascotaSeleccionada");
		this.mascotaSeleccionada = mascota;
	}

	public onMascotaEditarHoras(mascota:MascotaModel): void {
		console.log("onMascotaEditarHoras");		
		this.router.navigate(['/recepcionista/horas/listar/'+mascota.rutmascota]);
	}

	public irAgendar():void {
	    console.warn("irAgendar();");
	    var enviar = true;
	    var errores:string = "Le faltó:";
	    if(this.duenoSeleccionado==null){
	      enviar = false;
	      errores+="<br/>Buscar un dueño";
	    }
	    if(this.mascotaSeleccionada==null){
	      enviar = false;
	      errores+="<br/>Seleccionar una mascota";
	    }
	    if(enviar){
	      this.router.navigate(['/recepcionista/horas/agendar/'+this.duenoSeleccionado.rutdueno+'/'+this.mascotaSeleccionada.rutmascota]);        
	    } else {
	      this.MzToastService.show(errores,5000,'red');
	    }
	}
}
