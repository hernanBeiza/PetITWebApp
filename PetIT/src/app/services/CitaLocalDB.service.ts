import { Injectable } from '@angular/core';


import { MascotaModel } from './../models/MascotaModel';
import { CitaModel } from './../models/CitaModel';

@Injectable()
export class CitaLocalDBService {

  public constCita:string = "DBCITA";

  constructor() { 
    if(this.obtenerVarios.length==0){

    }
  }
 
  public guardar(cita:CitaModel):void {
    console.log("guardar");
    let citas = this.obtenerVarios();
    citas.push(cita);
    localStorage.setItem(this.constCita,JSON.stringify(citas));    
  }

  public obtenerVarios():Array<CitaModel> {
    var citas:Array<CitaModel> = new Array<CitaModel>();
    let itemsArray = JSON.parse(localStorage.getItem(this.constCita));
    if(itemsArray){
      for (var i = 0;i<itemsArray.length; i++) {
        let item = itemsArray[i] as any;
        var mascota:MascotaModel = new MascotaModel(item.mascota.idmascota,item.mascota.nombre);
        var model:CitaModel = new CitaModel(item.dueno,mascota,item.especialidad,item.especialista,item.fecha,item.hora);
        citas.push(model);
      }      
    }
    return citas;
  }

}