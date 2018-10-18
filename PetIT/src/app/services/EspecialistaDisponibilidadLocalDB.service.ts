import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Rx';

import { LocalDBService } from './LocalDB.service';

import { EspecialistaModel } from './../models/EspecialistaModel';
import { EspecialistaDisponibilidadModel } from './../models/EspecialistaDisponibilidadModel';
import { EspecialidadModel } from './../models/EspecialidadModel';
import { BloqueHorarioModel } from './../models/BloqueHorarioModel';

@Injectable()
export class EspecialistaDisponibilidadLocalDBService {

  constructor(private LocalDBService:LocalDBService) { }

  public guardar(especialistaDisponibilidad:EspecialistaDisponibilidadModel): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "INSERT INTO especialistadisponibilidad (idespecialista,idbloquehorario,fecha) VALUES("+especialistaDisponibilidad.idespecialista+","+especialistaDisponibilidad.idbloquehorario+",'"+especialistaDisponibilidad.fecha+"')";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.insertId>0){
            var disponibilidad:EspecialistaDisponibilidadModel = new EspecialistaDisponibilidadModel();
            disponibilidad.idespecialistadisponibilidad = results.insertId;
            var result = {result:true,mensajes:"Disponibilidad guardada correctamente",disponibilidad:disponibilidad};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha podido guardar una disponibilidad de especialista"};
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

  public editar(especialistaDisponibilidad:EspecialistaDisponibilidadModel): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "UPDATE especialistadisponibilidad SET idespecialista ="+especialistaDisponibilidad.idespecialista+", idbloquehorario="+especialistaDisponibilidad.idbloquehorario+", fecha='"+especialistaDisponibilidad.fecha+"', WHERE idespecialistadisponibilidad = "+especialistaDisponibilidad.idespecialistadisponibilidad;
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){
            var result = {result:true,mensajes:"Disponibilidad editada correctamente",disponibilidad:especialistaDisponibilidad};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha podido editar la disponibilidad de especialista"};
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

  public eliminar(especialistaDisponibilidad:EspecialistaDisponibilidadModel): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "DELETE especialistadisponibilidad WHERE idespecialistadisponibilidad = "+especialistaDisponibilidad.idespecialistadisponibilidad;
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){
            var result = {result:true,mensajes:"Disponibilidad eliminada correctamente"};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han encontrado disponibilidad de especialista"};
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
  
  public obtenerConID(idespecialistadisponibilidad:number): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM especialistadisponibilidad WHERE idespecialistadisponibilidad="+idespecialistadisponibilidad.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = results.rows.item(0) as any;
            let especialistaDisponibilidad:EspecialistaDisponibilidadModel = new EspecialistaDisponibilidadModel(item.idespecialistadisponibiliad,item.idespecialista,item.idbloquehorario,item.fecha,item.valid);
            var result = {result:true,mensajes:"Disponibilidad encontrada",disponibilidad:especialistaDisponibilidad};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han encontrado especialista"};
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

  public obtenerConEspecialistaYFecha(especialista:EspecialistaModel,fecha:string): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM especialistadisponibilidad WHERE idespecialista="+especialista.idespecialista.toString() + " AND fecha='"+fecha+"'";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var disponibilidades:Array<EspecialistaDisponibilidadModel> = new Array<EspecialistaDisponibilidadModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows.item(i) as any;
              let especialistaDisponibilidad:EspecialistaDisponibilidadModel = new EspecialistaDisponibilidadModel(item.idespecialistadisponibiliad,item.idespecialista,item.idbloquehorario,item.fecha,item.valid);
              disponibilidades.push(especialistaDisponibilidad);
            }
            var result = {result:true,mensajes:"Disponibilidad encontrada para la fecha "+fecha,disponibilidades:disponibilidades};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha encontrado disponibilidad para la fecha " +fecha};
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