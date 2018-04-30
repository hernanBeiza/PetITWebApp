import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Rx';

import { LocalDBService } from './LocalDB.service';

import { MascotaModel } from './../models/MascotaModel';
import { DuenoModel } from './../models/DuenoModel';

import { environment } from './../../environments/environment';

@Injectable()
export class DuenoLocalDBService {

  public constDueno:string = "DBDUENO";
  public constDuenoSelected:string = "DBDUENOSELECTED";

  constructor(private LocalDBService:LocalDBService) { 
    /*
    if(this.obtenerVarios.length==0){
      let dueno = new DuenoModel(1,new MascotaModel(1,"Fideo"),"Cristian Contreras","44444444-4","Av Pocuro #123");
      let dueno2 = new DuenoModel(2,new MascotaModel(1,"Rocko"),"Daniel Águila","55555555-5","Las Margarita #1134");
      let dueno3 = new DuenoModel(3,new MascotaModel(1,"Mamut"),"Doris Napolitano","5929028-2","Av. Vicuña Mackenna #10082 #10082");      
      this.guardarVarios([dueno,dueno2,dueno3]);
    }
    */
  }
 
  public guardarVarios(duenos:Array<DuenoModel>):void{
    localStorage.setItem(this.constDueno,JSON.stringify(duenos));
  }

  public obtenerVarios():Array<DuenoModel> {
    console.warn("No está implementado ahora");
    return null;
    /*
    var duenos:Array<DuenoModel> = new Array<DuenoModel>();
    let itemsArray = JSON.parse(localStorage.getItem(this.constDueno));
    for (var i = 0;i<itemsArray.length; i++) {
      let item = itemsArray[i] as any;
      var mascota:MascotaModel = new MascotaModel(item.mascota.idmascota,item.mascota.nombre);
      var model:DuenoModel = new DuenoModel(item.iddueno,mascota,item.nombre,item.rut,item.direccion);
      duenos.push(model);
    }
    return duenos;
    */
  }


  public guardarSeleccionado(dueno:DuenoModel): void {
    localStorage.setItem(this.constDuenoSelected,JSON.stringify(dueno));
  }
  
  public obtenerSeleccionado():DuenoModel{
    let dueno:DuenoModel = JSON.parse(localStorage.getItem(this.constDuenoSelected));
    return dueno;
  }

  public obtener(): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT du.*, ma.idmascota,ma.iddueno,ma.nombre as nombreMascota FROM dueno AS du INNER JOIN mascota AS ma ON du.iddueno = ma.iddueno";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var duenos:Array<DuenoModel> = new Array<DuenoModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows[i] as any;
              var mascota:MascotaModel = new MascotaModel(item.idmascota,item.nombreMascota);
              var model:DuenoModel = new DuenoModel(item.iddueno,item.idusuario,item.rut,item.nombre,item.direccion,mascota);
              duenos.push(model);
            }
            var result = {result:true,mensajes:"Dueños encontrados",duenos:duenos};
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

  public obtenerConID(iddueno:number): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT du.*, ma.idmascota,ma.iddueno,ma.nombre as nombreMascota FROM dueno AS du INNER JOIN mascota AS ma ON du.iddueno = ma.iddueno WHERE du.iddueno = "+iddueno.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var item:any = results.rows[0] as any;
            var mascota:MascotaModel = new MascotaModel(item.idmascota,item.nombreMascota);
            var model:DuenoModel = new DuenoModel(item.iddueno,item.idusuario,item.rut,item.nombre,item.direccion,mascota);
            var result = {result:true,mensajes:"Dueño encontrado",dueno:model};
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
  public obtenerDuenoConMascota(iddueno:number,idmascota:number): Promise<Object> {
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT du.*, ma.idmascota,ma.iddueno,ma.nombre as nombreMascota FROM dueno AS du INNER JOIN mascota AS ma ON du.iddueno = ma.iddueno WHERE du.iddueno = "+iddueno.toString()+ " AND ma.idmascota = "+idmascota.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var item:any = results.rows[0] as any;
            var mascota:MascotaModel = new MascotaModel(item.idmascota,item.nombreMascota);
            var model:DuenoModel = new DuenoModel(item.iddueno,item.idusuario,item.rut,item.nombre,item.direccion,mascota);
            var result = {result:true,mensajes:"Dueño encontrado",dueno:model};
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