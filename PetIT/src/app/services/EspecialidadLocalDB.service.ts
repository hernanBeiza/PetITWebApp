import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Rx';

import { LocalDBService } from './LocalDB.service';

import { EspecialidadModel } from './../models/EspecialidadModel';
import { EspecialistaModel } from './../models/EspecialistaModel';
import { FechaModel } from './../models/FechaModel';
import { HoraModel } from './../models/HoraModel';

@Injectable()
export class EspecialidadLocalDBService {

  constructor(private LocalDBService:LocalDBService) { }
 
  public obtener(): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM especialidad";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var especialidades:Array<EspecialidadModel> = new Array<EspecialidadModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows[i] as any;
              let especialidad:EspecialidadModel = new EspecialidadModel(item.idespecialidad,item.nombre);
              especialidades.push(especialidad);
            }
            var result = {result:true,mensajes:"Especialidades encontradas",especialidades:especialidades};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han encontrado especialidades"};
            reject(resultNoEncontrado);                        
          }
        },function(tx,results){
          console.log(tx,results);
          var result = {result:false,errores:"Intenta de nuevo más tarde"};
          reject(result);            
          return false;
        });
      });
    });
    return promesa;    
  }

  public obtenerConID(idespecialidad:number): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM especialidad WHERE idespecialidad="+idespecialidad.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = results.rows[0] as any;
            let especialidad:EspecialidadModel = new EspecialidadModel(item.idespecialidad,item.nombre);
            var result = {result:true,mensajes:"Especialidad encontrada",especialidad:especialidad};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han encontrado especialidad"};
            reject(resultNoEncontrado);                        
          }
        },function(tx,results){
          console.log(tx,results);
          var result = {result:false,errores:"Intenta de nuevo más tarde"};
          reject(result);            
          return false;
        });
      });
    });
    return promesa;    
  }

 
}