import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Rx';

//Services
import { LocalDBService } from './LocalDB.service';
//Models
import { InformeModel } from './../models/InformeModel';
import { ComunaModel } from './../models/ComunaModel';

@Injectable()
export class InformeLocalDBService {

  constructor(private LocalDBService:LocalDBService) { }

  public generarTotalCitasPorMes(inicio:string,termino:string): Promise<Object> {
    //console.log("ComunaLocalDBService: obtener();");        
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT strftime('%d-%m-%Y', ed.fecha) AS nombre, COUNT(*) AS total FROM cita AS ci INNER JOIN especialistadisponibilidad AS ed ON ci.idespecialistadisponibilidad = ed.idespecialistadisponibilidad AND ed.fecha>='"+inicio+"' AND ed.fecha<='"+termino+"' GROUP BY strftime('%d-%m-%Y', ed.fecha) ORDER BY ed.fecha ASC";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var estadisticas:Array<any>= new Array<any>();
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows.item(i) as any;
              console.log(item);
              estadisticas.push(item);
            }
            var result = {result:true,mensajes:"Estadísticas generadas",estadisticas:estadisticas};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se han encontrado datos para generar estadísticas"};
            reject(resultError);                        
          }
        },function(tx,results){
          console.log(tx,results);
          var result = {result:false,errores:"Hubo un error. Intenta de nuevo más tarde"};
          reject(result);            
          return false;
        });
      });
    });
    return promesa;
  }

  public generarTotalDeMascotasPorTipo(inicio:string,termino:string): Promise<Object> {
    //console.log("ComunaLocalDBService: obtener();");        
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT tm.nombre, COUNT(*) total FROM mascota AS ma INNER JOIN tipomascota AS tm ON ma.idtipomascota = tm.idtipomascota AND ma.fecha>='"+inicio+"' AND ma.fecha<='"+termino+"' GROUP BY tm.idtipomascota";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var estadisticas:Array<any>= new Array<any>();
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows.item(i) as any;
              console.log(item);
              estadisticas.push(item);
            }
            var result = {result:true,mensajes:"Estadísticas generadas",estadisticas:estadisticas};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se han encontrado datos para generar estadísticas"};
            reject(resultError);                        
          }
        },function(tx,results){
          console.log(tx,results);
          var result = {result:false,errores:"Hubo un error. Intenta de nuevo más tarde"};
          reject(result);            
          return false;
        });
      });
    });
    return promesa;
  }
  public generarTotalDeMascotasPorRaza(inicio:string,termino:string): Promise<Object> {
    //console.log("ComunaLocalDBService: obtener();");        
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT r.nombre, COUNT(*) total FROM mascota AS ma INNER JOIN raza AS r ON ma.idraza = r.idraza AND ma.fecha>='"+inicio+"' AND ma.fecha<='"+termino+"' GROUP BY r.idraza";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var estadisticas:Array<any>= new Array<any>();
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows.item(i) as any;
              console.log(item);
              estadisticas.push(item);
            }
            var result = {result:true,mensajes:"Estadísticas generadas",estadisticas:estadisticas};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se han encontrado datos para generar estadísticas"};
            reject(resultError);                        
          }
        },function(tx,results){
          console.log(tx,results);
          var result = {result:false,errores:"Hubo un error. Intenta de nuevo más tarde"};
          reject(result);            
          return false;
        });
      });
    });
    return promesa;
  }

  public generarTotalDeCitasPorEspecialidad(inicio:string,termino:string): Promise<Object> {
    //console.log("ComunaLocalDBService: obtener();");        
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT esp.nombre, COUNT(*) AS total FROM cita AS ci INNER JOIN especialistadisponibilidad AS ed ON ci.idespecialistadisponibilidad = ed.idespecialistadisponibilidad INNER JOIn especialista AS es ON ed.idespecialista = es.idespecialista INNER JOIN especialidad AS esp ON es.idespecialidad = esp.idespecialidad AND ed.fecha>='"+inicio+"' AND ed.fecha<='"+termino+"' GROUP BY esp.nombre ORDER BY ed.fecha DESC";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var estadisticas:Array<any>= new Array<any>();
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows.item(i) as any;
              console.log(item);
              estadisticas.push(item);
            }
            var result = {result:true,mensajes:"Estadísticas generadas",estadisticas:estadisticas};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se han encontrado datos para generar estadísticas"};
            reject(resultError);                        
          }
        },function(tx,results){
          console.log(tx,results);
          var result = {result:false,errores:"Hubo un error. Intenta de nuevo más tarde"};
          reject(result);            
          return false;
        });
      });
    });
    return promesa;
  }

  public generarTotalDeNotificacionesLeidas(inicio:string,termino:string): Promise<Object> {
    //console.log("ComunaLocalDBService: obtener();");        
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT titulo AS nombre, COUNT(*) AS total FROM notificacion WHERE valid = 2 AND fecha>='"+inicio+"' AND fecha<='"+termino+"' GROUP BY titulo ORDER BY fecha DESC";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var estadisticas:Array<any>= new Array<any>();
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows.item(i) as any;
              console.log(item);
              estadisticas.push(item);
            }
            var result = {result:true,mensajes:"Estadísticas generadas",estadisticas:estadisticas};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se han encontrado datos para generar estadísticas"};
            reject(resultError);                        
          }
        },function(tx,results){
          console.log(tx,results);
          var result = {result:false,errores:"Hubo un error. Intenta de nuevo más tarde"};
          reject(result);            
          return false;
        });
      });
    });
    return promesa;
  }
}