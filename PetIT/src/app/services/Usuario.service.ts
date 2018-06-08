import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Rx';

import { LocalDBService } from './LocalDB.service';

import { UsuarioModel } from './../models/UsuarioModel';

import { environment } from './../../environments/environment';

@Injectable()
export class UsuarioService  {

  public constUsuario:string = "PetITLocalUsuario";

  constructor(private http: Http, private LocalDBService:LocalDBService) { }
 
  public iniciarSesion(rut:string,contrasena:string): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM `usuario` WHERE usuario='"+rut+ "' AND contrasena='"+contrasena+"'";
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
              var model:UsuarioModel = new UsuarioModel(item.idusuario,item.idusuariorol,item.user,item.pass,item.nombre,item.valid);
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
    formData.append("usuario",usuario.user);
    formData.append("contrasena",usuario.pass);

    return this.http.post(url,formData,this.getOptions()).map((res) => {
      //console.info(res);
      let body = res.json();
      console.log(body);
      var respuesta = {}
      if(body.result){
        var usuario:any = body.usuario;
        var model = new UsuarioModel(usuario.idusuario,usuario.user,null,usuario.nombre,usuario.valid);
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