import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Rx';

import { UsuarioModel } from './../models/UsuarioModel';

import { environment } from './../../environments/environment';

@Injectable()
export class UsuarioService {

  constructor(private http: Http) { }
 
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

  private getOptions(): RequestOptions{
    return new RequestOptions({headers:this.getHeader(),withCredentials: true });
  }

  private getHeader(): Headers {
    let headers = new Headers({});
    return headers;
  }

}