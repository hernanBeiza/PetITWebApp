import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Rx';

import { LocalDBService } from './LocalDB.service';

import { UsuarioModel } from './../models/UsuarioModel';

import { environment } from './../../environments/environment';

@Injectable()
export class UsuarioLocalDBService  {

  public constUsuario:string = "PetITLocalUsuario";

  constructor(private http: Http, private LocalDBService:LocalDBService) { }
 
  public iniciarSesion(rut:string,contrasena:string): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM `usuario` WHERE rut='"+rut+ "' AND password='"+contrasena+"'";
        console.log(sql);
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
              var model:UsuarioModel = new UsuarioModel(item.idusuario,item.idrol,item.nombre,item.rut,item.password,item.valid);
              var result = {result:true,mensajes:"Bienvenido "+item.nombre,usuario:model};
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
          console.log(tx,results);
          var result = {result:false,errores:"Intenta de nuevo más tarde"};
          reject(result);            
          return false;
        });
      });
    });
    return promesa;    
  }

  public login(usuario:UsuarioModel): Observable<any[]>{
    console.info("Usuario.service.ts: login();");
    var url = environment.API+"login";

    let formData = new FormData();
    formData.append("usuario",usuario.rut);
    formData.append("contrasena",usuario.password);

    return this.http.post(url,formData,this.getOptions()).map((res) => {
      //console.info(res);
      let body = res.json();
      console.log(body);
      var respuesta = {}
      if(body.result){
        var item:any = body.usuario;
        var model:UsuarioModel = new UsuarioModel(item.idusuario,item.idrol,item.nombre,item.rut,item.password,item.valid);
        respuesta = {result:body.result,mensajes:body.mensajes,usuario:model}
      } else {
        respuesta = {result:body.result,errores:body.errores}
      }
      return respuesta;
      //return body || { };
    }).catch((error) =>{
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        //console.info(body);
        //const err = body.error || JSON.stringify(body);
        //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        return Observable.throw(body);
      } else {
        errMsg = error.message ? error.message : error.toString();
        //console.info(errMsg);
        return Observable.throw(errMsg);
      }
    });
  }

  public session(): Observable<any[]>{
    console.info("Usuario.service.ts: session();");
    var url = environment.API+"session";
    return this.http.post(url,null,this.getOptions()).map((res) => {
      //console.info(res);
      let body = res.json();
      console.info(body);
      var respuesta = {};
      if(body.result){
        respuesta = {result:body.result,mensajes:body.mensajes}
      } else {
        respuesta = {result:body.result,errores:body.errores}
      }
      return respuesta;
      //return body || { };
    }).catch((error) =>{
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        //console.info(body);
        //const err = body.error || JSON.stringify(body);
        //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        return Observable.throw(body);
      } else {
        errMsg = error.message ? error.message : error.toString();
        //console.info(errMsg);
        return Observable.throw(errMsg);
      }
    });
  }

  public logout(): Observable<any[]>{
    console.info("Usuario.service.ts: logout();");
    var url = environment.API+"logout";
    return this.http.post(url,null,this.getOptions()).map((res) => {
      let body = res.json();
      console.info(body);
      var respuesta = {};
      if(body.result){
        respuesta = {result:body.result,mensajes:body.mensajes}
      } else {
        respuesta = {result:body.result,errores:body.errores}
      }
      return respuesta;
      //return body || { };
    }).catch((error) =>{
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        //console.info(body);
        //const err = body.error || JSON.stringify(body);
        //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        return Observable.throw(body);
      } else {
        errMsg = error.message ? error.message : error.toString();
        //console.info(errMsg);
        return Observable.throw(errMsg);
      }
    });
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