import { Injectable } from '@angular/core';

import { MascotaModel } from './../models/MascotaModel';

@Injectable()
export class MascotaLocalDBService {

  public constMascota:string = "DBMASCOTA";

  constructor() { }
 
  public guardar(mascota:MascotaModel):void{
    localStorage.setItem(this.constMascota,JSON.stringify(mascota));
  }

  public obtener():MascotaModel {
    let mascota:MascotaModel;
    mascota = JSON.parse(localStorage.getItem(this.constMascota));
    return mascota;
  }

  public borrarUsuario():boolean {
    localStorage.removeItem(this.constMascota);
    return true;
  }

}