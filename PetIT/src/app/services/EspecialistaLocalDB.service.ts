import { Injectable } from '@angular/core';

import { EspecialistaModel } from './../models/EspecialistaModel';
import { EspecialidadModel } from './../models/EspecialidadModel';

@Injectable()
export class EspecialistaLocalDBService {

  public constEspecialidad:string = "DBESPECIALISTAS";

  constructor() { 
    if(this.obtener.length==0){
      let item = new EspecialistaModel(1,"Hans Poffald");
      let item2 = new EspecialistaModel(1,"Graciela Baldrich");
      this.guardarVarios([item,item2]);
    }
  }
 
  public guardarVarios(duenos:Array<EspecialistaModel>):void{
    localStorage.setItem(this.constEspecialidad,JSON.stringify(duenos));
  }

  public guardar(dueno:EspecialistaModel):void {
    localStorage.setItem(this.constEspecialidad,JSON.stringify(dueno));
  }

  public obtener():Array<EspecialistaModel> {
    var duenos:Array<EspecialistaModel> = new Array<EspecialistaModel>();
    let itemsArray = JSON.parse(localStorage.getItem(this.constEspecialidad));
    for (var i = 0;i<itemsArray.length; i++) {
      let item = itemsArray[i] as any;
      console.log(item);

      //var model:EspecialistaModel = new EspecialistaModel(item.iddueno,item.nombre,item.rut,item.direccion,item.valid);
      //duenos.push(model);
    }
    return duenos;
  }
}