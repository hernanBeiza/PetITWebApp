import { Component, OnInit } from '@angular/core';

import { MzToastService } from 'ng2-materialize';

import { CitaLocalDBService } from './../../../services/CitaLocalDB.service';

import { CitaModel } from './../../../models/CitaModel';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

	public citas:Array<CitaModel> = new Array<CitaModel>();

	constructor(private CitaLocalDBService:CitaLocalDBService,
	    private MzToastService: MzToastService) { }

	ngOnInit() {
		console.log("ngOnInit();");
		this.CitaLocalDBService.obtenerUltimas().then((data:any) => {
			console.log(data);
			if(data.result){
				this.citas = data.citas;
				this.MzToastService.show(data.mensajes,3000,'green');
			} else {
				this.MzToastService.show(data.mensajes,5000,'red');
			}
		},(dataError:any) => {
			console.error(dataError);
			this.MzToastService.show(dataError.errores,5000,'red');
		});
	}

	ngOnDestroy() {
    	console.info("ngOnDestroy();");
	}

}
