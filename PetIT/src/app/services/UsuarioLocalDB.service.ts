import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Rx';

import { environment } from './../../environments/environment';

import {LocalDBService} from './LocalDB.service';

import {UsuarioModel} from './../models/UsuarioModel';
import {RolModel} from './../models/RolModel';

@Injectable()
export class UsuarioLocalDBService  {

  public constUsuario:string = "PetITLocalUsuario";

  constructor(private http: Http, private LocalDBService:LocalDBService) { }

  public iniciarSesion(model:UsuarioModel): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT u.*, r.idrol, r.nombre AS nombreRol, r.valid AS validRol FROM usuario AS u INNER JOIN rol AS r ON r.idrol = u.idrol WHERE u.rut='"+model.rut+ "' AND u.password='"+model.password+"'";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          //console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            //Safari no puede recorrer este arreglo
            var items = [];
            for (var i = 0; i < results.rows.length; i++){
                items.push(results.rows.item(i));
            }
            if(items.length>0){
              var item:any = items[0] as any;
              var usuario:UsuarioModel = new UsuarioModel(item.idusuario,item.idrol,item.nombre,item.rut,item.password,item.valid);
              var rol:RolModel = new RolModel(item.idrol,item.nombre,item.validRol);
              
              var result = {result:true,mensajes:"Bienvenido "+item.nombre,usuario:usuario,rol:rol};
              resolve(result);              
            } else {
              var resultNoEncontrado = {result:false,errores:"No se ha encontrado usuario con esos datos"};
              reject(resultNoEncontrado);                                      
            }

          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha encontrado usuario con esos datos"};
            reject(resultNoEncontrado);                        
          }
        },function(tx,results){
          console.error(tx,results);
          var result = {result:false,errores:"Intenta de nuevo más tarde"};
          reject(result);            
          return false;
        });
      });
    });
    return promesa;
  }

  public guardar(usuario:UsuarioModel): Promise<Object> {
    console.log("UsuarioLocalService: guardar();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "INSERT INTO usuario (idrol,nombre,rut,password) VALUES ("+usuario.idrol+",'"+usuario.nombre+"','"+usuario.rut+"','"+usuario.password+"')";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){
            let model:UsuarioModel = new UsuarioModel(results.insertId);
            var result = {result:true,mensajes:"Usuario guardado correctamente!",cita:model};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se pudo crear el usuario."};
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

  public modificar(usuario:UsuarioModel): Promise<Object> {
    console.log("UsuarioLocalService: modificar();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "UPDATE usuario SET idrol="+usuario.idrol+",nombre='"+usuario.nombre+"',rut='"+usuario.rut+"', password='"+usuario.password+"' WHERE idusuario="+usuario.idusuario;
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){
            let model:UsuarioModel = new UsuarioModel(results.insertId);
            var result = {result:true,mensajes:"Usuario modificado correctamente",usuario:model};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se pudo modificar el usuario."};
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
    console.log("UsuarioLocalService: obtener();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM usuario"
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
        console.log(tx,results,results.rows.length);
        if(results.rows.length>0){
              var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
              var usuarios:Array<UsuarioModel> = new Array<UsuarioModel>();
              for (var i = 0; i < results.rows.length; i++){
                var item:any = results.rows[i] as any;
                var model:UsuarioModel = new UsuarioModel(item.idusuario,item.idrol,item.nombre,item.rut,item.password,item.valid);
                usuarios.push(model);
              }
              var result = {result:true,mensajes:"Usuarios encontrados",usuarios:usuarios};
          resolve(result);
        } else {
              var resultNoEncontrado = {result:false,errores:"No se han encontrado usuarios"};
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

  public obtenerConID(idusuario:number): Promise<Object> {
    console.log("UsuarioLocalService: obtenerConID();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM usuario WHERE idusuario = "+idusuario.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var item:any = results.rows[0] as any;
            var model:UsuarioModel = new UsuarioModel(item.idusuario,item.idrol,item.nombre,item.rut,item.password,item.valid);
            var result = {result:true,mensajes:"Usuario encontrado",usuario:model};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha encontrado usuario con esos datos"};
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

  public eliminar(usuario:UsuarioModel): Promise<Object> {
    console.log("UsuarioLocalService: eliminar();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "UPDATE usuario SET valid=2 WHERE idusuario="+usuario.idusuario.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var item:any = results.rows[0] as any;
            //var model:UsuarioModel = new UsuarioModel(item.idusuario,item.idrol,item.nombre,item.rut,item.password,item.valid);
            var result = {result:true,mensajes:"Usuario eliminado"};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha encontrado usuario con esos datos"};
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

  public recuperarContrasena(usuario:UsuarioModel): Promise<Object> {
    console.log("UsuarioLocalService: recuperarContrasena();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM usuario WHERE rut = "+usuario.rut;
        //console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          //console.log(tx,results,results.rows.length);
          var result = {result:true,mensajes:"Si existe un usuario con estos datos, te enviaremos la contraseña a tu correo"};
          resolve(result);
          /*
          if(results.rows.length>0){
            var result = {result:true,mensajes:"Si existe un usuario con estos datos, te enviaremos la contraseña a tu correo"};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha encontrado usuario con esos datos"};
            reject(resultNoEncontrado);                        
          }
          */
        },function(tx,results){
          //console.log(tx,results);
          var result = {result:false,errores:"Intenta de nuevo más tarde"};
          reject(result);            
          return false;
        });
      });
    });
    return promesa;
  }

  public guardarLocal(usuario:UsuarioModel): boolean {
    localStorage.setItem(this.constUsuario, JSON.stringify(usuario));
    return true;
  }

  public obtenerLocal():UsuarioModel {
    return JSON.parse(localStorage.getItem(this.constUsuario)) as UsuarioModel;
  }

  public borrarLocal():boolean {
    localStorage.removeItem(this.constUsuario);
    return true;
  }

  private getOptions(): RequestOptions{
    return new RequestOptions({headers:this.getHeader(),withCredentials: true });
  }

  private getHeader(): Headers {
    let headers = new Headers({});
    return headers;
  }

}