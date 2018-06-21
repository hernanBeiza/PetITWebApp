import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Rx';

//Services
import { LocalDBService } from './LocalDB.service';
//Models
import { CitaModel } from './../models/CitaModel';
import { MascotaModel } from './../models/MascotaModel';
import { DuenoMascotaModel } from './../models/DuenoMascotaModel';
import { EspecialidadModel } from './../models/EspecialidadModel';
import { EspecialistaModel } from './../models/EspecialistaModel';
import { HoraModel } from './../models/HoraModel';

@Injectable()
export class CitaLocalDBService {

  constructor(private LocalDBService:LocalDBService) { }
 
  public guardar(cita:CitaModel): Promise<Object> {
    console.log("CitaLocalDBService: guardar();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "INSERT INTO cita (rutmascota,idespecialista,idhora,idorigen) VALUES ('"+cita.rutmascota+"',"+cita.idespecialista+","+cita.idhora+",1)";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){
            //Actualizar el estado de la hora para que no puedan volver a tomar la misma
            var sql2 = "UPDATE hora SET valid=2 WHERE idhora = "+cita.idhora;
            console.info(sql2);
            tx.executeSql(sql2,[],function(tx,results){
              console.log(tx,results,results.rows.length);
            });
 
            let model:CitaModel = new CitaModel(results.insertId);
            var result = {result:true,mensajes:"¡Cita agendada correctamente!",cita:model};
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


  public modificar(cita:CitaModel): Promise<Object> {
    console.log("CitaLocalDBService: modificar();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "UPDATE cita SET rutmascota="+cita.rutmascota+",idespecialista ="+cita.idespecialista+",hora="+cita.idhora+ " WHERE idcita="+cita.idcita;
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){
            //Actualizar el estado de la hora para que no puedan volver a tomar la misma
            var sql2 = "UPDATE hora SET valid=2 WHERE idhora = "+cita.idhora;
            console.info(sql2);
            tx.executeSql(sql2,[],function(tx,results){
              console.log(tx,results,results.rows.length);
            });
 
            let model:CitaModel = new CitaModel(results.insertId);
            var result = {result:true,mensajes:"¡Cita modificada correctamente!",cita:model};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se pudo modificar la cita."};
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
    console.log("CitaLocalDBService: obtener();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT ci.*, ho.fecha,ho.hora,ma.rutdueno, ma.nombre AS nombreMascota, du.nombres AS nombreDueno, du.apellidopaterno AS paternoDueno, du.apellidomaterno AS maternoDueno, es.nombres AS nombreEspecialista, es.apellidopaterno AS paternoEspecialista, es.apellidomaterno AS maternoEspecialista, esp.nombre AS nombreEspecialidad FROM cita AS ci INNER JOIN mascota AS ma ON ci.rutmascota = ma.rutmascota INNER JOIN duenomascota AS du ON ma.rutdueno = du.rutdueno INNER JOIN especialista AS es ON ci.idespecialista = es.idespecialista INNER JOIN especialidad AS esp ON es.idespecialidad = esp.idespecialidad INNER JOIN hora AS ho ON ci.idhora = ho.idhora";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var citas:Array<CitaModel>= new Array<CitaModel>();
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = results.rows[0] as any;
            var dueno:DuenoMascotaModel = new DuenoMascotaModel();
            dueno.rutdueno = item.rutdueno;
            dueno.nombres = item.nombreDueno;
            dueno.apellidopaterno = item.paternoDueno;
            dueno.apellidomaterno = item.maternoDueno;

            var mascota:MascotaModel = new MascotaModel();
            mascota.rutmascota = item.rutmascota;
            mascota.nombre = item.nombreMascota;

            var especialidad:EspecialidadModel = new EspecialidadModel();
            especialidad.nombre = item.nombreEspecialidad;

            var especialista:EspecialistaModel = new EspecialistaModel();
            especialista.nombres = item.nombreEspecialista;
            especialista.apellidopaterno = item.paternoEspecialista;
            especialista.apellidomaterno = item.maternoEspecialista;

            var hora:HoraModel = new HoraModel();
            hora.fecha = item.fecha;
            hora.hora = item.hora;

            let cita:CitaModel = new CitaModel(item.idcita,item.rutmascota,item.idespecialista,item.idhora,item.origen,item.valid);
            cita.duenoMascotaModel = dueno;
            cita.especialistaModel = especialista;
            cita.mascotaModel = mascota;
            cita.horaModel = hora;
            citas.push(cita);
            var result = {result:true,mensajes:"Citas encontradas",citas:citas};
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
    console.log("CitaLocalDBService: obtenerUltimas();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT ci.*, ho.fecha,ho.hora,ma.rutdueno, ma.nombre AS nombreMascota, du.nombres AS nombreDueno, du.apellidopaterno AS paternoDueno, du.apellidomaterno AS maternoDueno, es.nombres AS nombreEspecialista, es.apellidopaterno AS paternoEspecialista, es.apellidomaterno AS maternoEspecialista, esp.nombre AS nombreEspecialidad FROM cita AS ci INNER JOIN mascota AS ma ON ci.rutmascota = ma.rutmascota INNER JOIN duenomascota AS du ON ma.rutdueno = du.rutdueno INNER JOIN especialista AS es ON ci.idespecialista = es.idespecialista INNER JOIN especialidad AS esp ON es.idespecialidad = esp.idespecialidad INNER JOIN hora AS ho ON ci.idhora = ho.idhora ORDER by idcita DESC LIMIT 5";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var citas:Array<CitaModel>= new Array<CitaModel>();
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = results.rows[0] as any;

            var dueno:DuenoMascotaModel = new DuenoMascotaModel();
            dueno.rutdueno = item.rutdueno;
            dueno.nombres = item.nombreDueno;
            dueno.apellidopaterno = item.paternoDueno;
            dueno.apellidomaterno = item.maternoDueno;

            var mascota:MascotaModel = new MascotaModel();
            mascota.rutmascota = item.rutmascota;
            mascota.nombre = item.nombreMascota;

            var especialidad:EspecialidadModel = new EspecialidadModel();
            especialidad.nombre = item.nombreEspecialidad;

            var especialista:EspecialistaModel = new EspecialistaModel();
            especialista.nombres = item.nombreEspecialista;
            especialista.apellidopaterno = item.paternoEspecialista;
            especialista.apellidomaterno = item.maternoEspecialista;

            var hora:HoraModel = new HoraModel();
            hora.fecha = item.fecha;
            hora.hora = item.hora;

            let cita:CitaModel = new CitaModel(item.idcita,item.rutmascota,item.idespecialista,item.idhora,item.origen,item.valid);
            cita.duenoMascotaModel = dueno;
            cita.mascotaModel = mascota;
            cita.especialistaModel = especialista;
            cita.horaModel = hora;

            citas.push(cita);
            var result = {result:true,mensajes:"Citas encontradas",citas:citas};
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

  public obtenerConID(idcita:number): Promise<Object> {
    console.log("CitaLocalDBService: obtenerConID();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT ci.*, ho.fecha,ho.hora,ma.rutdueno, ma.nombre AS nombreMascota, du.nombres AS nombreDueno, du.apellidopaterno AS paternoDueno, du.apellidomaterno AS maternoDueno, es.nombres AS nombreEspecialista, es.apellidopaterno AS paternoEspecialista, es.apellidomaterno AS maternoEspecialista, esp.nombre AS nombreEspecialidad FROM cita AS ci INNER JOIN mascota AS ma ON ci.rutmascota = ma.rutmascota INNER JOIN duenomascota AS du ON ma.rutdueno = du.rutdueno INNER JOIN especialista AS es ON ci.idespecialista = es.idespecialista INNER JOIN especialidad AS esp ON es.idespecialidad = esp.idespecialidad INNER JOIN hora AS ho ON ci.idhora = ho.idhora WHERE ci.idcita ="+idcita.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = results.rows[0] as any;
            var dueno:DuenoMascotaModel = new DuenoMascotaModel();
            dueno.rutdueno = item.rutdueno;
            dueno.nombres = item.nombreDueno;
            dueno.apellidopaterno = item.paternoDueno;
            dueno.apellidomaterno = item.maternoDueno;

            var mascota:MascotaModel = new MascotaModel();
            mascota.rutmascota = item.rutmascota;
            mascota.nombre = item.nombreMascota;

            var especialidad:EspecialidadModel = new EspecialidadModel();
            especialidad.nombre = item.nombreEspecialidad;

            var especialista:EspecialistaModel = new EspecialistaModel();
            especialista.nombres = item.nombreEspecialista;
            especialista.apellidopaterno = item.paternoEspecialista;
            especialista.apellidomaterno = item.maternoEspecialista;

            var hora:HoraModel = new HoraModel();
            hora.fecha = item.fecha;
            hora.hora = item.hora;

            let cita:CitaModel = new CitaModel(item.idcita,item.rutmascota,item.idespecialista,item.idhora,item.origen,item.valid);
            cita.duenoMascotaModel = dueno;
            cita.especialistaModel = especialista;
            cita.mascotaModel = mascota;
            cita.horaModel = hora;

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

  public obtenerConRut(rutdueno:string): Promise<Object> {
    console.log("CitaLocalDBService: obtenerConRut();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT ci.idcita,ci.idhora,ci.idespecialista,ci.idhoraci.valid,ho.fecha.ho.hora,du.rutdueno AS rutDueno, du.nombres AS nombresDueno, du.apellidopaterno AS paternoDueno, du.apellidomaterno AS maternoDueno,du.direccion,du.telefono,du.correo,du.valid FROM cita AS ci INNER JOIN duenomascota AS du ON du.rutdueno = ma.rutdueno INNER JOIN mascota AS ma ON ci.rutmascota = ma.rutmascota INNER JOIN hora AS ho ON ci.idhora = ho.idhora WHERE du.rutdueno = '"+rutdueno.toString()+"'";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var citas:Array<CitaModel> = new Array<CitaModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows[i] as any;

              var cita:CitaModel = new CitaModel(item.idcita,item.rutmascota,item.idespecialista,item.idhora,item.origen,item.valid);
              var mascota:MascotaModel = new MascotaModel(item.rutmascota,item.idtipomascota,item.idraza,item.rutDueno,item.nombreMascota,item.peso,item.edad,item.validMascota);
              var dueno:DuenoMascotaModel = new DuenoMascotaModel(item.rutDueno,item.idusuario,item.nombresDueno,item.paternoDueno,item.maternoDueno,item.comuna,item.direccion,item.telefono,item.correo,item.valid);
              citas.push(cita);
            }
            var result = {result:true,mensajes:"Citas encontradas",citas:citas};
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

}