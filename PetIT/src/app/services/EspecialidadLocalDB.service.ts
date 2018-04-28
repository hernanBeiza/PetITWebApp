import { Injectable } from '@angular/core';

import { EspecialidadModel } from './../models/EspecialidadModel';
import { EspecialistaModel } from './../models/EspecialistaModel';
import { FechaModel } from './../models/FechaModel';
import { HoraModel } from './../models/HoraModel';

@Injectable()
export class EspecialidadLocalDBService {

  public constEspecialidades:string = "DBESPECIALIDAD";

  constructor() { 
    if(this.obtener.length==0){
      let horas = new Array<HoraModel>(
        new HoraModel(1,"10:45"));

      let horas2 = new Array<HoraModel>(
        new HoraModel(1,"14:00"),
        new HoraModel(1,"15:00"),
        new HoraModel(1,"16:00"));

      let fechas = new Array<FechaModel>(
        new FechaModel(1,"14-05-2018", horas),
        new FechaModel(1,"15-05-2018",horas2));

      let fechas2 = new Array<FechaModel>(
        new FechaModel(1,"05-05-2018", horas),
        new FechaModel(1,"02-06-2018",horas2));
      
      let especialistas = new Array<EspecialistaModel>(
        new EspecialistaModel(1,"Hans Poffald",fechas));

      let especialistas2 = new Array<EspecialistaModel>(
        new EspecialistaModel(1,"Claudio Igor",fechas2));

      let especialidad = new EspecialidadModel(1,"General", especialistas);
      let especialidad2 = new EspecialidadModel(2,"Peluquería",especialistas2);
      this.guardarVarios([especialidad,especialidad2]);
    }
  }
 
  public guardarVarios(especialidades:Array<EspecialidadModel>):void {
    console.log(especialidades);
    localStorage.setItem(this.constEspecialidades,JSON.stringify(especialidades));
  }

  public obtener():Array<EspecialidadModel> {
    console.log("EspecialidadLocalDBService",this.constEspecialidades);
    var especialidades:Array<EspecialidadModel> = new Array<EspecialidadModel>();
    let itemsArray = JSON.parse(localStorage.getItem(this.constEspecialidades));
    console.log(itemsArray);

    for (var i = 0;i<itemsArray.length; i++) {
      let item = itemsArray[i] as any;
      console.log(item);
      var model:EspecialidadModel = new EspecialidadModel(item.idespecialidad,item.nombre,item.especialistas);
      especialidades.push(model);
    }
    return especialidades;
  }

}