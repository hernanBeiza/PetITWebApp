import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Rx';

import { Subject } from 'rxjs/Subject';

import { LocalDBService } from './LocalDB.service';

import { ComunaModel } from './../models/ComunaModel';
import { MascotaModel } from './../models/MascotaModel';
import { DuenoMascotaModel } from './../models/DuenoMascotaModel';

import { environment } from './../../environments/environment';

@Injectable()
export class DuenoMascotaLocalDBService {

  constructor(private LocalDBService:LocalDBService) { }

  public guardar(dueno:DuenoMascotaModel): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "INSERT INTO duenomascota (rutdueno,nombres,apellidopaterno,apellidomaterno,idcomuna,direccion,telefono,correo) VALUES('"+dueno.rutdueno+"','"+dueno.nombres+"','"+dueno.apellidopaterno+"','"+dueno.apellidomaterno+"','"+dueno.idcomuna+"','"+dueno.direccion+"','"+dueno.telefono+"','"+dueno.correo+"')";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.insertId>0){
            var result = {result:true,mensajes:"Dueño guardado correctamente"};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha podido guardar el dueño"};
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

  public modificar(dueno:DuenoMascotaModel): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "UPDATE duenomascota SET rutdueno='"+dueno.rutdueno+"', nombres='"+dueno.nombres+"', apellidopaterno='"+dueno.apellidopaterno+"', apellidomaterno='"+dueno.apellidomaterno+"', idcomuna='"+dueno.idcomuna+"', direccion='"+dueno.direccion+"', telefono='"+dueno.telefono+"', correo='"+dueno.correo+"' WHERE rutdueno = '"+dueno.rutdueno+"'";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){
            var result = {result:true,mensajes:"Dueño modificado correctamente"};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han podido modificar los datos del dueño"};
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

  public eliminar(dueno:DuenoMascotaModel): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "DELETE FROM duenomascota WHERE rutdueno = '" + dueno.rutdueno+"'";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          //console.log(tx,results);
          if(results.rowsAffected>0){
            var result = {result:true,mensajes:"Dueño eliminados"};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha eliminado el dueño"};
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

  public obtener(): Promise<Object> {
    //console.log("DuenoMascotaLocalDB: obtener();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM duenomascota";
        //console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          //console.log(tx,results);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var duenos:Array<DuenoMascotaModel> = new Array<DuenoMascotaModel>();
            for (var i = 0; i < rows.length; i++){
              var item:any = rows.item(i) as any;
              var dueno:DuenoMascotaModel = new DuenoMascotaModel(item.rutdueno,item.idusuario,item.nombres,item.apellidopaterno,item.apellidomaterno,item.comuna,item.direccion,item.telefono,item.correo,item.valid);              
              duenos.push(dueno);
            }
            var result = {result:true,mensajes:"Dueños encontrados",duenos:duenos};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han encontrado dueños"};
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

  public obtenerConMascota(): Promise<Object> {
    //console.log("DuenoMascotaLocalDB: obtenerConMascota();");

    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT du.rutdueno AS rutDueno,du.*, ma.rutmascota,ma.rutdueno,ma.nombre as nombreMascota, ma.peso,ma.edad,ma.valid AS validMascota FROM duenomascota AS du INNER JOIN mascota AS ma ON du.rutdueno = ma.rutdueno";
        //console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          //console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var duenos:Array<DuenoMascotaModel> = new Array<DuenoMascotaModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = rows.item(i) as any;
              var mascota:MascotaModel = new MascotaModel(item.rutmascota,item.idtipomascota,item.idraza,item.rutDueno,item.nombreMascota,item.peso,item.edad,item.validMascota);
              var dueno:DuenoMascotaModel = new DuenoMascotaModel(item.rutDueno,item.idusuario,item.nombres,item.apellidopaterno,item.apellidomaterno,item.comuna,item.direccion,item.telefono,item.correo,item.valid);
              dueno.mascotas.push(mascota);
              duenos.push(dueno);
            }
            var result = {result:true,mensajes:"Dueño encontrado",duenos:duenos};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han encontrado dueños"};
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

  public obtenerConRut(rutdueno:string): Promise<Object> {
    console.log("DuenoMascotaLocalDB: obtenerConRut();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT du.rutdueno AS rutDueno, du.*, co.nombre AS nombreComuna,ma.rutmascota,ma.rutdueno,ma.nombre as nombreMascota,ma.idtipomascota,ma.idraza,ma.peso,ma.edad,ma.valid AS validMascota FROM duenomascota AS du LEFT JOIN mascota AS ma ON du.rutdueno = ma.rutdueno INNER JOIN comuna AS co ON du.idcomuna = co.idcomuna WHERE du.rutdueno = '"+rutdueno.toString()+"' LIMIT 1";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var duenos:Array<DuenoMascotaModel> = new Array<DuenoMascotaModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = rows.item(i) as any;
              var dueno:DuenoMascotaModel = new DuenoMascotaModel(item.rutDueno,item.idusuario,item.nombres,item.apellidopaterno,item.apellidomaterno,item.idcomuna,item.direccion,item.telefono,item.correo,item.valid);
              var comunaModel = new ComunaModel();
              comunaModel.idcomuna = item.idcomuna;
              comunaModel.nombre = item.nombreComuna;
              dueno.comunaModel = comunaModel;
              duenos.push(dueno);
            }
            var result = {result:true,mensajes:"Dueño encontrado",dueno:duenos[0]};
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


  public obtenerConNombreApellido(dato:string): Promise<Object> {
    console.log("DuenoMascotaLocalDB: obtenerConNombreApellido();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT du.rutdueno AS rutDueno, du.*,  co.nombre AS nombreComuna, ma.rutmascota,ma.rutdueno,ma.nombre as nombreMascota,ma.idtipomascota,ma.idraza,ma.peso,ma.edad,ma.valid AS validMascota FROM duenomascota AS du LEFT JOIN mascota AS ma ON du.rutdueno = ma.rutdueno INNER JOIN comuna AS co ON du.idcomuna = co.idcomuna WHERE du.nombres LIKE '"+dato.toString()+ "%' OR du.apellidopaterno LIKE '"+dato.toString()+"%' OR du.apellidomaterno LIKE '"+dato.toString()+"%' LIMIT 1";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var duenos:Array<DuenoMascotaModel> = new Array<DuenoMascotaModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = rows.item(i) as any;
              var dueno:DuenoMascotaModel = new DuenoMascotaModel(item.rutDueno,item.idusuario,item.nombres,item.apellidopaterno,item.apellidomaterno,item.comuna,item.direccion,item.telefono,item.correo,item.valid);               
              var comunaModel = new ComunaModel();
              comunaModel.idcomuna = item.idcomuna;
              comunaModel.nombre = item.nombreComuna;
              dueno.comunaModel = comunaModel;
              duenos.push(dueno);
            }
            var result = {result:true,mensajes:"Dueño encontrado",dueno:duenos[0]};
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


  public obtenerDuenoConMascota(rutdueno:string,rutmascota:string): Promise<Object> {
    console.log("DuenoMascotaLocalDB: obtenerDuenoConMascota();");

    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT du.rutdueno AS rutDueno, du.*, ma.rutmascota,ma.rutdueno,ma.nombre as nombreMascota,ma.idtipomascota,ma.idraza, ma.peso,ma.edad,ma.valid AS validMascota FROM duenomascota AS du INNER JOIN mascota AS ma ON du.rutdueno = ma.rutdueno WHERE du.rutdueno = '"+rutdueno.toString()+ "' AND ma.rutmascota = "+rutmascota.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
          if(results.rows.length>0){
            var item:any = rows.item(0) as any;
            var mascota:MascotaModel = new MascotaModel(item.rutmascota,item.idtipomascota,item.idraza,item.rutDueno,item.nombreMascota,item.peso,item.edad,item.validMascota);
            var dueno:DuenoMascotaModel = new DuenoMascotaModel(item.rutDueno,item.idusuario,item.nombres,item.apellidopaterno,item.apellidomaterno,item.comuna,item.direccion,item.telefono,item.correo,item.valid);
            dueno.mascotas.push(mascota);
            var result = {result:true,mensajes:"Dueño encontrado",dueno:dueno};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha encontrado dueño con esos datos"};
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

  public obtenerConIDUsuario(idusuario:number): Promise<Object> {
    console.log("DuenoMascotaLocalDB: obtenerConIDUsuario();");

    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT du.rutdueno AS rutDueno, du.*, ma.rutmascota,ma.rutdueno,ma.nombre as nombreMascota,ma.idtipomascota,ma.idraza, ma.peso,ma.edad,ma.valid AS validMascota FROM duenomascota AS du LEFT JOIN mascota AS ma ON du.rutdueno = ma.rutdueno WHERE du.idusuario = "+idusuario.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
          if(results.rows.length>0){
            var item:any = rows.item(0) as any;
            var dueno:DuenoMascotaModel = new DuenoMascotaModel(item.rutDueno,item.idusuario,item.nombres,item.apellidopaterno,item.apellidomaterno,item.comuna,item.direccion,item.telefono,item.correo,item.valid);
            var result = {result:true,mensajes:"Dueño encontrado",dueno:dueno};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha encontrado dueño con esos datos"};
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