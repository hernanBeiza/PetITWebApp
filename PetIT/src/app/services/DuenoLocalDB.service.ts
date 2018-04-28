import { Injectable } from '@angular/core';


import { MascotaModel } from './../models/MascotaModel';
import { DuenoModel } from './../models/DuenoModel';

import { environment } from './../../environments/environment';

@Injectable()
export class DuenoLocalDBService {

  public constDueno:string = "DBDUENO";
  public constDuenoSelected:string = "DBDUENOSELECTED";

  constructor() { 
    if(this.obtenerVarios.length==0){
      let dueno = new DuenoModel(1,new MascotaModel(1,"Fideo"),"Cristian Contreras","44444444-4","Av Pocuro #123");
      let dueno2 = new DuenoModel(2,new MascotaModel(1,"Rocko"),"Daniel Águila","55555555-5","Las Margarita #1134");
      let dueno3 = new DuenoModel(3,new MascotaModel(1,"Mamut"),"Doris Napolitano","5929028-2","Av. Vicuña Mackenna #10082 #10082");      
      this.guardarVarios([dueno,dueno2,dueno3]);
    }
  }
 
  public guardarVarios(duenos:Array<DuenoModel>):void{
    localStorage.setItem(this.constDueno,JSON.stringify(duenos));
  }

  public obtenerVarios():Array<DuenoModel> {
    var duenos:Array<DuenoModel> = new Array<DuenoModel>();
    let itemsArray = JSON.parse(localStorage.getItem(this.constDueno));
    for (var i = 0;i<itemsArray.length; i++) {
      let item = itemsArray[i] as any;
      var mascota:MascotaModel = new MascotaModel(item.mascota.idmascota,item.mascota.nombre);
      var model:DuenoModel = new DuenoModel(item.iddueno,mascota,item.nombre,item.rut,item.direccion);
      duenos.push(model);
    }
    return duenos;
  }


  public guardarSeleccionado(dueno:DuenoModel): void {
    localStorage.setItem(this.constDuenoSelected,JSON.stringify(dueno));
  }
  
  public obtenerSeleccionado():DuenoModel{
    let dueno:DuenoModel = JSON.parse(localStorage.getItem(this.constDuenoSelected));
    return dueno;
  }

}