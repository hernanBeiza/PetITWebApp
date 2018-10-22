import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Rx';

import { LocalDBService } from './LocalDB.service';

import { EspecialistaModel } from './../models/EspecialistaModel';
import { EspecialidadModel } from './../models/EspecialidadModel';

@Injectable()
export class EspecialistaLocalDBService {

  constructor(private LocalDBService:LocalDBService) { }

  public obtener(): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM especialista";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var especialistas:Array<EspecialistaModel> = new Array<EspecialistaModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows.item(i) as any;
              let especialista:EspecialistaModel = new EspecialistaModel(item.idespecialista,item.idespecialidad,item.rut,item.nombres,item.apellidopaterno,item.apellidomaterno,item.correo,item.direccion,item.comuna,item.valid);
              especialistas.push(especialista);
            }
            var result = {result:true,mensajes:"Especialistas encontrados",especialistas:especialistas};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han encontrado especialistas"};
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

  public obtenerConID(idespecialista:number): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM especialista WHERE idespecialista="+idespecialista.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = results.rows.item(0) as any;
            let especialista:EspecialistaModel = new EspecialistaModel(item.idespecialista,item.idespecialidad,item.rut,item.nombres,item.apellidopaterno,item.apellidomaterno,item.correo,item.direccion,item.comuna,item.valid);
            var result = {result:true,mensajes:"Especialista encontrado",especialista:especialista};
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

  public obtenerConRut(rut:string): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM especialista WHERE rut='"+rut+"'";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = results.rows.item(0) as any;
            let especialista:EspecialistaModel = new EspecialistaModel(item.idespecialista,item.idespecialidad,item.rut,item.nombres,item.apellidopaterno,item.apellidomaterno,item.correo,item.direccion,item.comuna,item.valid);
            var result = {result:true,mensajes:"Especialista encontrado",especialista:especialista};
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

  public obtenerConEspecialidad(especialidad:EspecialidadModel): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM especialista WHERE idespecialidad="+especialidad.idespecialidad.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var especialistas:Array<EspecialistaModel> = new Array<EspecialistaModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows.item(i) as any;
              let especialista:EspecialistaModel = new EspecialistaModel(item.idespecialista,item.idespecialidad,item.rut,item.nombres,item.apellidopaterno,item.apellidomaterno,item.correo,item.direccion,item.comuna,item.valid);
              especialistas.push(especialista);
            }
            var result = {result:true,mensajes:"Especialistas encontrados",especialistas:especialistas};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han encontrado especialistas"};
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