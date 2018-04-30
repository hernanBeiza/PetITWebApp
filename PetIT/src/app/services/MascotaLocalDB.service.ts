import { Injectable } from '@angular/core';

import { MascotaModel } from './../models/MascotaModel';

@Injectable()
export class MascotaLocalDBService {

  public constMascota:string = "DBMASCOTA";

  constructor() { }
 
  public guardar(mascota:MascotaModel):void{
    localStorage.setItem(this.constMascota,JSON.stringify(mascota));
  }

  public obtenerConID(id:string):MascotaModel {
    let mascota:MascotaModel;
    return mascota;
  }


}