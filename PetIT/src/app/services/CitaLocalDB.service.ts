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


  public modificar(horaAntigua:HoraModel,citaNueva:CitaModel): Promise<Object> {
    console.log("CitaLocalDBService: modificar();");
    console.log(horaAntigua.idhora,citaNueva.idhora,citaNueva.horaModel.idhora);
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "UPDATE cita SET rutmascota="+citaNueva.rutmascota+", idespecialista ="+citaNueva.idespecialista+", idhora="+citaNueva.idhora+ " WHERE idcita="+citaNueva.idcita;
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){

            var sql3 = "UPDATE hora SET valid=1 WHERE idhora = "+horaAntigua.idhora;
            console.info(sql3);
            tx.executeSql(sql3,[],function(tx,results){
              console.log(tx,results,results.rows.length);
            });

            //Actualizar el estado de la hora para que no puedan volver a tomar la misma
            var sql2 = "UPDATE hora SET valid=2 WHERE idhora = "+citaNueva.horaModel.idhora;
            console.info(sql2);
            tx.executeSql(sql2,[],function(tx,results){
              console.log(tx,results,results.rows.length);
            });
 
            let model:CitaModel = new CitaModel(citaNueva.idcita);
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

  public anular(cita:CitaModel): Promise<Object> {
    console.log("CitaLocalDBService: anular();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var queries = [
          "DELETE FROM cita WHERE idcita ="+ cita.idcita,
          "UPDATE hora SET valid = 1 WHERE idhora ="+cita.idhora
        ];
        queries.forEach(function(sql,index){
          console.info(sql);
          tx.executeSql(sql,[],function(tx,results){
            if(results.rowsAffected>0){
              var result = {result:true,mensajes:"Cita anulada correctamente"};
              resolve(result);
            } else {
              var resultNoEncontrado = {result:false,errores:"No se pudo anular la cita"};
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
    });
    return promesa;
  };
  
  public obtener(): Promise<Object> {
    console.log("CitaLocalDBService: obtener();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT ci.*, strftime('%d-%m-%Y', ho.fecha) AS fecha, ho.hora,ma.rutdueno, ma.nombre AS nombreMascota, du.nombres AS nombreDueno, du.apellidopaterno AS paternoDueno, du.apellidomaterno AS maternoDueno, es.nombres AS nombreEspecialista, es.apellidopaterno AS paternoEspecialista, es.apellidomaterno AS maternoEspecialista, esp.nombre AS nombreEspecialidad FROM cita AS ci INNER JOIN mascota AS ma ON ci.rutmascota = ma.rutmascota INNER JOIN duenomascota AS du ON ma.rutdueno = du.rutdueno INNER JOIN especialista AS es ON ci.idespecialista = es.idespecialista INNER JOIN especialidad AS esp ON es.idespecialidad = esp.idespecialidad INNER JOIN hora AS ho ON ci.idhora = ho.idhora";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var citas:Array<CitaModel>= new Array<CitaModel>();
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = rows.item(0) as any;
            console.log(item);
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
        var sql = "SELECT ci.*, strftime('%d-%m-%Y', ho.fecha) AS fecha, ho.hora,ma.rutdueno, ma.nombre AS nombreMascota, du.nombres AS nombreDueno, du.apellidopaterno AS paternoDueno, du.apellidomaterno AS maternoDueno, es.nombres AS nombreEspecialista, es.apellidopaterno AS paternoEspecialista, es.apellidomaterno AS maternoEspecialista, esp.nombre AS nombreEspecialidad FROM cita AS ci INNER JOIN mascota AS ma ON ci.rutmascota = ma.rutmascota INNER JOIN duenomascota AS du ON ma.rutdueno = du.rutdueno INNER JOIN especialista AS es ON ci.idespecialista = es.idespecialista INNER JOIN especialidad AS esp ON es.idespecialidad = esp.idespecialidad INNER JOIN hora AS ho ON ci.idhora = ho.idhora ORDER by idcita DESC LIMIT 5";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var citas:Array<CitaModel>= new Array<CitaModel>();
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = rows.item(0) as any;
            console.log(item);

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
        var sql = "SELECT ci.*, ho.fecha AS fecha, ho.hora,ma.rutdueno, ma.nombre AS nombreMascota, du.nombres AS nombreDueno, du.apellidopaterno AS paternoDueno, du.apellidomaterno AS maternoDueno, es.nombres AS nombreEspecialista, es.apellidopaterno AS paternoEspecialista, es.apellidomaterno AS maternoEspecialista, esp.idespecialidad,esp.nombre AS nombreEspecialidad FROM cita AS ci INNER JOIN mascota AS ma ON ci.rutmascota = ma.rutmascota INNER JOIN duenomascota AS du ON ma.rutdueno = du.rutdueno INNER JOIN especialista AS es ON ci.idespecialista = es.idespecialista INNER JOIN especialidad AS esp ON es.idespecialidad = esp.idespecialidad INNER JOIN hora AS ho ON ci.idhora = ho.idhora WHERE ci.idcita ="+idcita.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = rows.item(0) as any;
            console.log(item);
            var dueno:DuenoMascotaModel = new DuenoMascotaModel();
            dueno.rutdueno = item.rutdueno;
            dueno.nombres = item.nombreDueno;
            dueno.apellidopaterno = item.paternoDueno;
            dueno.apellidomaterno = item.maternoDueno;

            var mascota:MascotaModel = new MascotaModel();
            mascota.rutmascota = item.rutmascota;
            mascota.nombre = item.nombreMascota;

            var especialidad:EspecialidadModel = new EspecialidadModel();
            especialidad.idespecialidad = item.idespecialidad;
            especialidad.nombre = item.nombreEspecialidad;

            var especialista:EspecialistaModel = new EspecialistaModel();
            especialista.idespecialista = item.idespecialista;
            especialista.nombres = item.nombreEspecialista;
            especialista.apellidopaterno = item.paternoEspecialista;
            especialista.apellidomaterno = item.maternoEspecialista;

            var hora:HoraModel = new HoraModel();
            hora.idhora = item.idhora;
            hora.idespecialista = item.idespecialista;
            hora.fecha = item.fecha;
            hora.hora = item.hora;

            let cita:CitaModel = new CitaModel(item.idcita,item.rutmascota,item.idespecialista,item.idhora,item.origen,item.valid);
            cita.duenoMascotaModel = dueno;
            cita.especialistaModel = especialista;
            cita.mascotaModel = mascota;
            cita.horaModel = hora;
            cita.especialidadModel = especialidad;

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

  public obtenerConRut(rutmascota:string): Promise<Object> {
    console.log("CitaLocalDBService: obtenerConRut();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT ci.idcita,ci.idhora,ci.idespecialista,ci.idhora,ci.valid,strftime('%d-%m-%Y', ho.fecha) AS fecha,ho.hora, du.rutdueno AS rutDueno, du.nombres AS nombresDueno, du.apellidopaterno AS paternoDueno, du.apellidomaterno AS maternoDueno, du.direccion,du.telefono,du.correo,du.valid, es.nombres AS nombreEspecialista, es.apellidoPaterno AS paternoEspecialista, es.apellidoMaterno AS maternoEspecialista, esp.nombre AS especialidadNombre, ma.nombre AS nombreMascota FROM cita AS ci INNER JOIN duenomascota AS du ON du.rutdueno = ma.rutdueno INNER JOIN mascota AS ma ON ci.rutmascota = ma.rutmascota  INNER JOIN hora AS ho ON ci.idhora = ho.idhora INNER JOIN especialista AS es ON ci.idespecialista = es.idespecialista INNER JOIN especialidad AS esp ON es.idespecialidad = esp.idespecialidad WHERE ci.rutmascota = '"+rutmascota.toString()+"'";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var citas:Array<CitaModel> = new Array<CitaModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows.item(i) as any;

              var hora:HoraModel = new HoraModel();
              hora.fecha = item.fecha;
              hora.hora = item.hora;

              var cita:CitaModel = new CitaModel(item.idcita,item.rutmascota,item.idespecialista,item.idhora,item.origen,item.valid);
              
              var mascota:MascotaModel = new MascotaModel(item.rutmascota,item.idtipomascota,item.idraza,item.rutDueno,item.nombreMascota,item.peso,item.edad,item.validMascota);
              
              var dueno:DuenoMascotaModel = new DuenoMascotaModel(item.rutDueno,item.idusuario,item.nombresDueno,item.paternoDueno,item.maternoDueno,item.comuna,item.direccion,item.telefono,item.correo,item.valid);
              
              var especialidad:EspecialidadModel = new EspecialidadModel();
              especialidad.nombre = item.especialidadNombre;
              
              var especialista:EspecialistaModel = new EspecialistaModel();
              especialista.nombres = item.nombreEspecialista;
              especialista.apellidopaterno = item.paternoEspecialista;

              cita.horaModel = hora;
              cita.mascotaModel = mascota;
              cita.duenoMascotaModel = dueno;
              cita.especialistaModel = especialista;
              cita.especialidadModel = especialidad;
              citas.push(cita);
            }
            var result = {result:true,mensajes:"Citas encontradas",citas:citas};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han encontrado citas para esta mascota"};
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