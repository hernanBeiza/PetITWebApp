import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { MzModalComponent,MzToastService} from 'ng2-materialize';

import { Mensajes } from './../../../../libs/Mensajes';

import { MascotaLocalDBService } from './../../../../services/MascotaLocalDB.service';

import { RutValidator } from 'ng2-rut';

import { DuenoMascotaModel } from './../../../../models/DuenoMascotaModel';
import { MascotaModel } from './../../../../models/MascotaModel';

@Component({
  selector: 'app-mascotas-consultar',
  templateUrl: './mascotas-consultar.component.html',
  styleUrls: ['./mascotas-consultar.component.css']
})
export class MascotasConsultarComponent implements OnInit {

	public mascotaSeleccionada:MascotaModel;
	public mascotas:Array<MascotaModel>;

	public enviandoFlag:boolean = false;
	
	@ViewChild('detalleSheetModal') detalleSheetModal: MzModalComponent;
	@ViewChild('eliminarSheetModal') eliminarSheetModal: MzModalComponent;

	public modalOptions: Materialize.ModalOptions = {
	    dismissible: false, // Modal can be dismissed by clicking outside of the modal
	    opacity: .5, // Opacity of modal background
	    inDuration: 300, // Transition in duration
	    outDuration: 200, // Transition out duration
	    startingTop: '100%', // Starting top style attribute
	    endingTop: '10%', // Ending top style attribute
	    ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
	      //console.log('Ready');
	      //console.log(modal, trigger);
	    },
	    complete: () => { 
	      //console.log('Closed'); 
	    } // Callback for Modal close
	};

	public buscarForm:FormGroup;
	public stringControl:AbstractControl;
	public fieldControl:AbstractControl;

	public filtroString: string = ""
	public filtroField: string = "rut";

	constructor(private router:Router, private fb:FormBuilder, 
		private ActivatedRoute: ActivatedRoute, 
	    private MzToastService:MzToastService,
	    private MascotaLocalDBService:MascotaLocalDBService) { 
		this.buscarForm = this.fb.group({
	    	'filtroString': [this.filtroString, Validators.compose([Validators.required])],
	    	'filtroField': [this.filtroField, Validators.compose([Validators.required])],
		});

		this.stringControl = this.buscarForm.controls['filtroString'];
		this.fieldControl = this.buscarForm.controls['filtroField'];
	}

	ngOnInit() { }

	public onSubmit(values:Object):void {
	    if (this.buscarForm.valid) {
			if(this.filtroField=="nombre"){
				this.buscarConNombre();
			} else {
				this.buscarConRut();
			}
	    }
	}
	  
	private buscarConNombre(): void {
	    this.MascotaLocalDBService.obtenerConNombre(this.filtroString).then((data:any)=>{
	      console.log(data);
	      if(data.result){
	        this.mascotas = data.mascotas;
	        this.MzToastService.show(data.mensajes,3000,'green');
	      } else {
	      	this.mascotas = new Array<MascotaModel>();
	        this.MzToastService.show(data.errores,5000,'red');
	      }
	    },(dataError:any)=>{
				console.error(dataError);
				this.mascotas = new Array<MascotaModel>();
				this.MzToastService.show(dataError.errores,5000,'red');
	    });
	}

	private buscarConRut(): void {
	    this.MascotaLocalDBService.obtenerConRut(this.filtroString).then((data:any)=>{
	      console.log(data);
	      if(data.result){
	        this.mascotas = data.mascotas;
	        this.MzToastService.show(data.mensajes,3000,'green');
	      } else {
	      	this.mascotas = new Array<MascotaModel>();
	        this.MzToastService.show(data.errores,5000,'red');
	      }
	    },(dataError:any)=>{
	      console.error(dataError);
      	this.mascotas = new Array<MascotaModel>();	      
	      this.MzToastService.show(dataError.errores,5000,'red');
	    });
	}

	public verDetalle(mascota:MascotaModel): void {
		this.mascotaSeleccionada = mascota;
		this.detalleSheetModal.open();
	}

	public irModificar(mascota:MascotaModel): void {
		this.router.navigate(["/recepcionista/mascotas/modificar/"+mascota.rutmascota]);
	}

	public eliminar(mascota:MascotaModel): void {
		this.mascotaSeleccionada = mascota;
		this.eliminarSheetModal.open();		
	}
	
}
