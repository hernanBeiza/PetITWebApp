import { Component, OnInit, Output, EventEmitter } from '@angular/core';


import { DuenoModel } from './../../../../models/DuenoModel';
import { MascotaModel } from './../../../../models/MascotaModel';
import { DuenoLocalDBService} from './../../../../services/DuenoLocalDB.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

	public duenos:Array<DuenoModel> = new Array<DuenoModel>();
	public filtroString: string = ""
	public filtroField: string = "nombre";
    
	constructor(private DuenoLocalDBService:DuenoLocalDBService) { }

	ngOnInit() { }

	public cargar():void {
	    this.DuenoLocalDBService.obtenerConMascota().then((data:any)=> {
			if(data.result){
				console.log(data.duenos);
				this.duenos = data.duenos;
			}
	    },(dataError)=> {
			console.error(dataError);
	    });
	}

	public onSearchChange(texto:string): void {
		console.log(texto);
		console.warn("Sin implementar");
		/*
		if(this.filtroField=="nombre"){
	        this.DuenoLocalDBService.buscarDuenoConNombre(texto);			
		} else {
			this.DuenoLocalDBService.buscarDuenoConRut(texto);
		}
		*/
	}

}