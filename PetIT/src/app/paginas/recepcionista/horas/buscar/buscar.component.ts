import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MzToastService } from 'ng2-materialize';

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

  constructor(private router:Router, 
    private DuenoLocalDBService:DuenoLocalDBService,
    private MzToastService:MzToastService) { 
      console.log("BuscarComponent");
  }

  ngOnInit() {
    this.cargar();
  }

  public cargar():void {
    this.DuenoLocalDBService.obtenerConMascota().then((data:any)=> {
      console.log(data);
      if(data.result){
        this.duenos = data.duenos;
        this.MzToastService.show(data.mensajes,3000,'green');
      } else {
        this.MzToastService.show(data.errores,5000,'red');
      }
    },(dataError)=> {
      console.error(dataError);
      this.MzToastService.show(dataError.errores,5000,'red');
    });
  }

  public irAgendar(dueno:DuenoModel):void {
  	console.log("irSeleccionar");
    //console.log(dueno);
    this.router.navigate(['/recepcionista/horas/agendar/'+dueno.iddueno+'/'+dueno.mascota.idmascota]);
  }

}