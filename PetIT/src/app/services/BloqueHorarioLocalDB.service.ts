import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Rx';

import * as moment from 'moment'; 

//Services
import { LocalDBService } from './LocalDB.service';

//Models
import { FechaModel } from './../models/FechaModel';
import { EspecialistaModel } from './../models/EspecialistaModel';
import { BloqueHorarioModel } from './../models/BloqueHorarioModel';


@Injectable()
export class BloqueHorarioLocalDBService {

  constructor(private LocalDBService:LocalDBService) { }
 
  public guardar(bloque:BloqueHorarioModel): Promise<Object> {
    //console.log("CitaLocalDBService: guardar();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "INSERT INTO bloquehorario (horainicio,horatermino) VALUES ('"+bloque.horainicio+"','"+bloque.horatermino+"',1)";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){

            var result = {result:true,mensajes:"Bloque horario agregado correctamente"};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se pudo agregar el bloque horario."};
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


  public modificar(bloque:BloqueHorarioModel): Promise<Object> {
    //console.log("CitaLocalDBService: modificar();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "UPDATE bloquehorario SET horainicio="+bloque.horainicio+", horatermino ='"+bloque.horatermino+"',valid="+bloque.valid+" WHERE idbloquehorario="+bloque.idbloquehorario;
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          //console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){
            var result = {result:true,mensajes:"Bloque horario modificado correctamente"};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se pudo modificar el bloque horario"};
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

  
  public obtener(): Promise<Object> {
    //console.log("CitaLocalDBService: obtener();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM bloquehorario";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var bloques:Array<BloqueHorarioModel>= new Array<BloqueHorarioModel>();
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            for (var i = 0; i < rows.length; ++i) {
              var item:any = rows.item(i) as any;
              let bloque:BloqueHorarioModel = new BloqueHorarioModel(item.idbloquehorario,item.horainicio,item.horatermino,item.valid);
              bloques.push(bloque);
            }
            var result = {result:true,mensajes:"Bloques horarios encontrados",bloques:bloques};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se han encontrado bloques horarios"};
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


  public obtenerConID(bloque:BloqueHorarioModel): Promise<Object> {
    //console.log("CitaLocalDBService: obtenerConID();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM bloquehorario WHERE idbloquehorario="+bloque.idbloquehorario;
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = rows.item(0) as any;
            let bloque:BloqueHorarioModel = new BloqueHorarioModel(item.idbloque,item.horainicio,item.horatermino,item.valid);
            var result = {result:true,mensajes:"Bloques horario encontrado",bloque:bloque};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se han encontrado bloques horarios"};
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

  //Pasar a un servicio
  public crearFechas(bloques:Array<BloqueHorarioModel>,fechaDesde:string,fechaHasta:string):Array<any>{
    console.log("crearFechas();");
    let inicio = new Date(fechaDesde);
    let fin = new Date(fechaHasta);
    //console.log(inicio.toUTCString(),fin.toUTCString());

    let rango = this.obtenerFechasSinFinde(inicio,fin);
    
    var idFecha:number = 1;
    var fechas = new Array<FechaModel>();

    for (var i = 0; i < rango.length; ++i) {
      let item:Date = rango[i];
      for (var j = 0; j < bloques.length; ++j) {
        let bloque:BloqueHorarioModel = bloques[j];
        let fecha:FechaModel = new FechaModel(idFecha,item,bloque);
        fechas.push(fecha);
        idFecha++;
      }
    }
    return fechas;
  }
  
  //Pasar a un servicio
  public obtenerFechasSinFinde(inicio:Date,fin:Date): Array<Date> {
    console.log("obtenerFechasSinFinde();");

      var todas:Array<Date> = new Array<Date>();

      var start = moment(inicio, 'YYYY-MM-DD').utc(false);
      let end = moment(fin, 'YYYY-MM-DD').utc(false);

      //Ojo con la zona horario. Se usa UTC
      while (start <= end) {
      if (start.format('ddd') !== 'Sat' && start.format('ddd') !== 'Sun'){
        //console.log(start.format("ddd"));
          //console.log(start.utc(false).format("YYYY-MM-DD"));
          todas.push(new Date(start.utc(false).format("YYYY-MM-DD")));
      }
      start = moment(start, 'YYYY-MM-DD').utc(false).add(1, 'days');
    }
    return todas;
  }

}