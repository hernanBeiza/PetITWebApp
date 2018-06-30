import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

import { Ng2Rut } from 'ng2-rut';

import { Mensajes } from './../../../../libs/Mensajes';
import { Validaciones } from './../../../../libs/Validaciones';

import { DuenoMascotaLocalDBService } from './../../../../services/DuenoMascotaLocalDB.service';

import { RutValidator } from 'ng2-rut';

import { DuenoMascotaModel } from './../../../../models/DuenoMascotaModel';

@Component({
  selector: 'app-duenos-consultar',
  templateUrl: './duenos-consultar.component.html',
  styleUrls: ['./duenos-consultar.component.css']
})
export class DuenosConsultarComponent implements OnInit {

	public buscarForm:FormGroup;
	public stringControl:AbstractControl;
	public fieldControl:AbstractControl;

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

	public duenos:Array<DuenoMascotaModel> = new Array<DuenoMascotaModel>();
	public duenoSeleccionado:DuenoMascotaModel;

	public filtroString: string = ""
	public filtroField: string = "rut";

	public formErrors:any = Mensajes.validacionesBuscarDueno;

	constructor(private router:Router, private fb:FormBuilder, private activatedRoute: ActivatedRoute, 
	    private MzToastService:MzToastService,
	    private DuenoMascotaLocalDBService:DuenoMascotaLocalDBService,rutValidator: RutValidator) {
		this.buscarForm = this.fb.group({
	    	'filtroField': [this.filtroField, Validators.compose([Validators.required])],
	    	'filtroString': [this.filtroString, Validators.compose([Validators.required])],
		});

		this.fieldControl = this.buscarForm.controls['filtroField'];
		this.stringControl = this.buscarForm.controls['filtroString'];
	}

	ngOnInit() { }

	public onCambiarCriterio(criterio:string): void {
		console.log(criterio);
		this.stringControl.reset();
	}

	public onSubmit(values:Object):void {
		this.duenos = new Array<DuenoMascotaModel>();
	    if (this.buscarForm.valid) {
	      if(this.filtroField=="nombre"){
	        this.buscarConNombre();
	      } else {
	        this.buscarConRut();
	      }
	    }
	}
	  
	private buscarConNombre(): void {
	    this.DuenoMascotaLocalDBService.obtenerConNombreApellido(this.filtroString).then((data:any)=>{
	      console.log(data);
	      if(data.result){
	        this.duenos.push(data.dueno);
	        this.MzToastService.show(data.mensajes,3000,'green');
	      } else {
	        this.MzToastService.show(data.errores,5000,'red');
	      }
	    },(dataError:any)=>{
	      console.error(dataError);
	      this.MzToastService.show(dataError.errores,5000,'red');
	    });
	}

	private buscarConRut(): void {
	    this.DuenoMascotaLocalDBService.obtenerConRut(this.filtroString).then((data:any)=>{
	      console.log(data);
	      if(data.result){
	        this.duenos.push(data.dueno);
	        this.MzToastService.show(data.mensajes,3000,'green');
	      } else {
	        this.MzToastService.show(data.errores,5000,'red');
	      }
	    },(dataError:any)=>{
	      console.error(dataError);
	      this.MzToastService.show(dataError.errores,5000,'red');
	    });
	}

	public verDetalle(dueno:DuenoMascotaModel): void {
		this.duenoSeleccionado = dueno;
		this.detalleSheetModal.open();
	}

	public irModificar(dueno:DuenoMascotaModel): void {
		this.router.navigate(["/recepcionista/duenos/modificar/"+dueno.rutdueno]);
	}

	public irRegistrarMascota(dueno:DuenoMascotaModel): void {
		this.router.navigate(["/recepcionista/mascotas/registrar/"+dueno.rutdueno]);
	}

	public eliminar(dueno:DuenoMascotaModel): void {
		console.warn("eliminar",dueno);		
		this.eliminarSheetModal.open();
	}

}