import { Injectable } from '@angular/core';

import { DuenoModel } from './../models/DuenoModel';

@Injectable()
export class HoraLocalDBService {

  public constHora:string = "DBHORA";

  constructor() { }
 
  public guardar(usuario:DuenoModel):void{
    localStorage.setItem(this.constHora,JSON.stringify(usuario));
  }

  public obtener():DuenoModel {
    let usuario:DuenoModel;
    usuario = JSON.parse(localStorage.getItem(this.constHora));
    return usuario;
  }

  public borrar():boolean {
    localStorage.removeItem(this.constHora);
    return true;
  }

}