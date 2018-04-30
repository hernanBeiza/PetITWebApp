import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DuenoModel } from './../../../../models/DuenoModel';
import { MascotaModel } from './../../../../models/MascotaModel';
import { DuenoLocalDBService} from './../../../../services/DuenoLocalDB.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public duenos:Array<DuenoModel> = new Array<DuenoModel>();

  public filtroString: string = ""
  public filtroField: string = "nombre";

  constructor(private router:Router, private DuenoLocalDBService:DuenoLocalDBService) { 
    console.log("BuscarComponent");
  }

  ngOnInit() {
    this.cargar();
  }

  public cargar():void {
    this.DuenoLocalDBService.obtener().then((data:any)=> {
      console.log(data);
      if(data.result){
        this.duenos = data.duenos;
      }
    },(dataError)=> {
      console.error(dataError);
    });
  }

  public irAgendar(dueno:DuenoModel):void {
  	console.log("irSeleccionar");
    console.log(dueno);
    this.router.navigate(['/recepcionista/horas/agendar/'+dueno.iddueno+'/'+dueno.mascota.idmascota]);
  }

}
