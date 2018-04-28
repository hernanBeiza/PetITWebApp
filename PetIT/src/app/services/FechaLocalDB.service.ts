import { Injectable } from '@angular/core';

import { FechaModel } from './../models/FechaModel';

@Injectable()
export class FechaLocalDBService {

  public constFecha:string = "DBFECHA";

  constructor() { 
    if(this.obtener.length==0){
      let item = new FechaModel(1,"20180510");
      let item2 = new FechaModel(2,"20180610");
      let item3 = new FechaModel(3,"20180610");      
      this.guardarVarios([item,item2,item3]);
    }
  }
 
  public guardarVarios(duenos:Array<FechaModel>):void{
    localStorage.setItem(this.constFecha,JSON.stringify(duenos));
  }

  public guardar(dueno:FechaModel):void {

    localStorage.setItem(this.constFecha,JSON.stringify(dueno));
  }

  public obtener():Array<FechaModel> {
    var duenos:Array<FechaModel> = new Array<FechaModel>();
    let itemsArray = JSON.parse(localStorage.getItem(this.constFecha));
    for (var i = 0;i<itemsArray.length; i++) {
      let item = itemsArray[i] as any;
      var model:FechaModel = new FechaModel(item.idfecha,item.fecha,item.valid);
      duenos.push(model);
    }
    return duenos;
  }


}