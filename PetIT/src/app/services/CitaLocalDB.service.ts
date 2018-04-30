import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Rx';

import { LocalDBService } from './LocalDB.service';

import { CitaModel } from './../models/CitaModel';
import { MascotaModel } from './../models/MascotaModel';
import { DuenoModel } from './../models/DuenoModel';
import { EspecialidadModel } from './../models/EspecialidadModel';
import { EspecialistaModel } from './../models/EspecialistaModel';

@Injectable()
export class CitaLocalDBService {

  public constCita:string = "DBCITA";

  constructor(private LocalDBService:LocalDBService) { }
 
  public guardar(cita:CitaModel): Promise<Object> {
    console.warn("Sin Implementar");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "INSERT INTO cita (idmascota,idespecialista,fecha) VALUES ("+cita.mascota.idmascota+","+cita.especialista.idespecialista+",'"+cita.fecha+"')";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){
            let cita:CitaModel = new CitaModel(results.insertId);
            var result = {result:true,mensajes:"¡Cita agendada correctamente!",cita:cita};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se pudo agendar la cita."};
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
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT ci.*, ma.nombre, ma.iddueno, ma.nombre AS nombreMascota,du.nombre AS nombreDueno, es.nombre AS nombreEspecialista, esp.nombre AS nombreEspecialidad FROM cita AS ci INNER JOIN mascota AS ma ON ci.idmascota = ma.idmascota INNER JOIN dueno AS du ON ma.iddueno = du.iddueno INNER JOIN especialista AS es ON ci.idespecialista = es.idespecialista INNER JOIN especialidad AS esp ON es.idespecialidad = esp.idespecialidad";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var citas:Array<CitaModel> = new Array<CitaModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows[i] as any;

              var dueno:DuenoModel = new DuenoModel();
              dueno.iddueno = item.iddueno;
              dueno.nombre = item.nombreDueno;

              var mascota:MascotaModel = new MascotaModel();
              mascota.idmascota = item.idmascota;
              mascota.nombre = item.nombreMascota;

              var especialidad:EspecialidadModel = new EspecialidadModel();
              especialidad.nombre = item.nombreEspecialidad;
              var especialista:EspecialistaModel = new EspecialistaModel();
              especialista.nombre = item.nombreEspecialista;

              let cita:CitaModel = new CitaModel(item.idcita,dueno,mascota,especialidad,especialista,item.fecha);
              citas.push(cita);
            }
            var result = {result:true,mensajes:"Citas encontradas",citas:citas};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se han encontrado citas"};
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

  public obtenerConID(idcita:number): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT ci.*, ma.nombre, ma.iddueno, ma.nombre AS nombreMascota, du.nombre AS nombreDueno, es.nombre AS nombreEspecialista, esp.nombre AS nombreEspecialidad FROM cita AS ci INNER JOIN mascota AS ma ON ci.idmascota = ma.idmascota INNER JOIN dueno AS du ON ma.iddueno = du.iddueno INNER JOIN especialista AS es ON ci.idespecialista = es.idespecialista INNER JOIN especialidad AS esp ON es.idespecialidad = esp.idespecialidad WHERE ci.idcita ="+idcita.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = results.rows[0] as any;
            var dueno:DuenoModel = new DuenoModel();
            dueno.iddueno = item.iddueno;
            dueno.nombre = item.nombreDueno;

            var mascota:MascotaModel = new MascotaModel();
            mascota.idmascota = item.idmascota;
            mascota.nombre = item.nombreMascota;

            var especialidad:EspecialidadModel = new EspecialidadModel();
            especialidad.nombre = item.nombreEspecialidad;
            var especialista:EspecialistaModel = new EspecialistaModel();
            especialista.nombre = item.nombreEspecialista;

            let cita:CitaModel = new CitaModel(item.idcita,dueno,mascota,especialidad,especialista,item.fecha);
            var result = {result:true,mensajes:"Cita encontrada",cita:cita};
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

}