import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Rx';

//Services
import { LocalDBService } from './LocalDB.service';
//Models
import { NotificacionModel } from './../models/NotificacionModel';
import { DuenoMascotaModel } from './../models/DuenoMascotaModel';

@Injectable()
export class NotificacionLocalDBService {

  constructor(private LocalDBService:LocalDBService) { }
 
  public obtener(): Promise<Object> {
    console.log("NotificacionLocalDBService: obtener();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT ci.*, strftime('%d-%m-%Y', ho.fecha) AS fecha ,ho.hora,ma.rutdueno, ma.nombre AS nombreMascota, du.nombres AS nombreDueno, du.apellidopaterno AS paternoDueno, du.apellidomaterno AS maternoDueno, es.nombres AS nombreEspecialista, es.apellidopaterno AS paternoEspecialista, es.apellidomaterno AS maternoEspecialista, esp.nombre AS nombreEspecialidad FROM cita AS ci INNER JOIN mascota AS ma ON ci.rutmascota = ma.rutmascota INNER JOIN duenomascota AS du ON ma.rutdueno = du.rutdueno INNER JOIN especialista AS es ON ci.idespecialista = es.idespecialista INNER JOIN especialidad AS esp ON es.idespecialidad = esp.idespecialidad INNER JOIN hora AS ho ON ci.idhora = ho.idhora";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var notificaciones:Array<NotificacionModel>= new Array<NotificacionModel>();
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = results.rows[0] as any;
            notificaciones.push(item);
            var result = {result:true,mensajes:"Notificaciones encontradas",notificaciones:notificaciones};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se han encontrado cita"};
            reject(resultError);                        
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

  public obtenerUltimas(): Promise<Object> {
    console.log("NotificacionLocalDBService: obtenerUltimas();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      /*
      db.transaction(function (tx){
        var sql = "SELECT ci.*, ho.fecha,ho.hora,ma.rutdueno, ma.nombre AS nombreMascota, du.nombres AS nombreDueno, du.apellidopaterno AS paternoDueno, du.apellidomaterno AS maternoDueno, es.nombres AS nombreEspecialista, es.apellidopaterno AS paternoEspecialista, es.apellidomaterno AS maternoEspecialista, esp.nombre AS nombreEspecialidad FROM cita AS ci INNER JOIN mascota AS ma ON ci.rutmascota = ma.rutmascota INNER JOIN duenomascota AS du ON ma.rutdueno = du.rutdueno INNER JOIN especialista AS es ON ci.idespecialista = es.idespecialista INNER JOIN especialidad AS esp ON es.idespecialidad = esp.idespecialidad INNER JOIN hora AS ho ON ci.idhora = ho.idhora ORDER by idcita DESC LIMIT 5";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var notificaciones:Array<NotificacionModel>= new Array<NotificacionModel>();
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = results.rows[0] as any;
            notificaciones.push(item);
            var result = {result:true,mensajes:"Notificaciones encontradas",notificaciones:notificaciones};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se han encontrado cita"};
            reject(resultError);                        
          }
        },function(tx,results){
          console.log(tx,results);
          var result = {result:false,errores:"Intenta de nuevo más tarde"};
          reject(result);            
          return false;
        });
      });
      */
    });
    return promesa;    
  }

  public obtenerConID(idnotificacion:number): Promise<Object> {
    console.log("NotificacionLocalDBService: obtenerConID();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      /*
      db.transaction(function (tx){
        var sql = "SELECT ci.*, ho.fecha,ho.hora,ma.rutdueno, ma.nombre AS nombreMascota, du.nombres AS nombreDueno, du.apellidopaterno AS paternoDueno, du.apellidomaterno AS maternoDueno, es.nombres AS nombreEspecialista, es.apellidopaterno AS paternoEspecialista, es.apellidomaterno AS maternoEspecialista, esp.nombre AS nombreEspecialidad FROM cita AS ci INNER JOIN mascota AS ma ON ci.rutmascota = ma.rutmascota INNER JOIN duenomascota AS du ON ma.rutdueno = du.rutdueno INNER JOIN especialista AS es ON ci.idespecialista = es.idespecialista INNER JOIN especialidad AS esp ON es.idespecialidad = esp.idespecialidad INNER JOIN hora AS ho ON ci.idhora = ho.idhora WHERE ci.idcita ="+idcita.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = results.rows[0] as any;
            var result = {result:true,mensajes:"Notificación encontrada",notificacion:item};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se han encontrado cita"};
            reject(resultError);                        
          }
        },function(tx,results){
          console.log(tx,results);
          var result = {result:false,errores:"Intenta de nuevo más tarde"};
          reject(result);            
          return false;
        });
      });
      */
    });
    return promesa;    
  }

  public obtenerConDueno(dueno:DuenoMascotaModel): Promise<Object> {
    console.log("NotificacionLocalDBService: obtenerConRut();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT *,strftime('%d-%m-%Y', fecha) AS fecha FROM notificacion WHERE idusuario = '"+dueno.idusuario.toString()+"'";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var notificaciones:Array<NotificacionModel> = new Array<NotificacionModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows[i] as any;
              notificaciones.push(item);
            }
            var result = {result:true,mensajes:"Notificaciones encontradas",notificaciones:notificaciones};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han encontrados dueños"};
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

  public marcarLeida(notificacion:NotificacionModel): Promise<Object> {
    console.log("NotificacionLocalDBService: marcarLeida();");
    console.warn("Falta terminar el marcado o cambiado a valid 2 en la notificación");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      /*
      db.transaction(function (tx){
        var sql = "SELECT * FROM notificacion WHERE idusuario = '"+dueno.idusuario.toString()+"'";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var notificaciones:Array<NotificacionModel> = new Array<NotificacionModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows[i] as any;
              notificaciones.push(item);
            }
            var result = {result:true,mensajes:"Notificaciones encontradas",notificaciones:notificaciones};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han encontrados dueños"};
            reject(resultNoEncontrado);                        
          }
        },function(tx,results){
          console.log(tx,results);
          var result = {result:false,errores:"Intenta de nuevo más tarde"};
          reject(result);            
          return false;
        });
      });
      */
    });
    return promesa;    
  }

}