import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { MzToastService } from 'ng2-materialize';

import { DuenoLocalDBService} from './../../../../services/DuenoLocalDB.service';

import { DuenoModel } from './../../../../models/DuenoModel';
import { MascotaModel } from './../../../../models/MascotaModel';

@Component({
  selector: 'app-lista-encontrados',
  templateUrl: './lista-encontrados.component.html',
  styleUrls: ['./lista-encontrados.component.css']
})
export class ListaEncontradosComponent implements OnInit,OnDestroy {

	public duenos:Array<DuenoModel> = new Array<DuenoModel>();
	
	subscription: Subscription;

	constructor(private DuenoLocalDBService:DuenoLocalDBService,
	  	private MzToastService:MzToastService) { 
        this.subscription = this.DuenoLocalDBService.obtenerDuenosEncontrados().subscribe(data => {
        	console.log(data);
        	if(data.result){
        		this.MzToastService.show(data.mensajes,2000,'green');
        		this.duenos = data.duenos;
        	}else {
        		this.MzToastService.show(data.errores,2000,'red');
        		this.duenos = new Array<DuenoModel>();
			}
        });
	}

	ngOnInit() { }

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
