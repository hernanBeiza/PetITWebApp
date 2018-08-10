import { Component, OnInit, ViewChild } from '@angular/core';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

import { UsuarioModel } from './../../../../models/UsuarioModel';
import { DuenoMascotaModel } from './../../../../models/DuenoMascotaModel';
import { NotificacionModel } from './../../../../models/NotificacionModel';
import { UsuarioLocalDBService} from './../../../../services/UsuarioLocalDB.service';
import { NotificacionLocalDBService} from './../../../../services/NotificacionLocalDB.service';
import { DuenoMascotaLocalDBService} from './../../../../services/DuenoMascotaLocalDB.service';

@Component({
  selector: 'app-leer',
  templateUrl: './leer.component.html',
  styleUrls: ['./leer.component.css']
})
export class LeerComponent implements OnInit {

	@ViewChild('detalleSheetModal') detalleSheetModal: MzModalComponent;

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
		} 
	};


	public notificaciones:Array<NotificacionModel> = new Array<NotificacionModel>();

	public notificacionDetalleModel:NotificacionModel = new NotificacionModel();

	constructor(private MzToastService:MzToastService, 
		private UsuarioLocalDBService:UsuarioLocalDBService,
		private NotificacionLocalDBService:NotificacionLocalDBService,
	    private DuenoMascotaLocalDBService:DuenoMascotaLocalDBService) { }

	ngOnInit(): void { 
	    console.log("LeerComponent: ngOnInit();");
		// Obtener el id del dueño desde la ruta del navegador
		this.obtenerDuenoConUsuario();
	}

	public obtenerDuenoConUsuario(): void {
		if(this.UsuarioLocalDBService.obtenerLocal){
			let model:UsuarioModel = this.UsuarioLocalDBService.obtenerLocal();
			console.log(model);
			if(model.idusuario){
				this.DuenoMascotaLocalDBService.obtenerConIDUsuario(model.idusuario).then((data:any)=>{
					if(data.result){
						let dueno:DuenoMascotaModel = data.dueno as DuenoMascotaModel;
						this.cargarNotificaciones(data.dueno);
					} else {
						this.MzToastService.show(data.errores,3000,"red");
					}
				},(dataError:any)=>{
					this.MzToastService.show(dataError.errores,3000,"red");
				});
			}			
		}
	}

	public cargarNotificaciones(dueno:DuenoMascotaModel): void {
		this.NotificacionLocalDBService.obtenerConDueno(dueno).then((data:any)=>{
			if(data.result){
				this.notificaciones = data.notificaciones;
			} else {
				this.MzToastService.show("¡Error! No hay dueños registrados",3000,"red");
			}
		},(dataError:any)=>{
			console.error(dataError);
		});
	}

	public verDetalle(model:NotificacionModel): void {
		this.notificacionDetalleModel = model;
		this.detalleSheetModal.open();
	}

	public cerrarNotificacion(): void {
		this.detalleSheetModal.close();
		this.NotificacionLocalDBService.marcarLeida(this.notificacionDetalleModel).then((data:any)=>{
			if(data.result){

			} else {
				this.MzToastService.show("¡Error! No hay dueños registrados",3000,"red");
			}
		},(dataError:any)=>{
			console.error(dataError);
		});
	}

	public onPageChange(pagina:number): void {
		console.log(pagina);
	}

	ngOnDestroy() {
		console.log("LeerComponent: ngOnDestroy();");
	}

}