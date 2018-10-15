import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Rx';

//Services
import { LocalDBService } from './LocalDB.service';
//Models
import { ComunaModel } from './../models/ComunaModel';

@Injectable()
export class ComunaLocalDBService {

  constructor(private LocalDBService:LocalDBService) { }

  public obtener(): Promise<Object> {
    //console.log("ComunaLocalDBService: obtener();");    
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM comuna";
        //console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          //console.log(tx,results,results.rows.length);
          var comunas:Array<ComunaModel>= new Array<ComunaModel>();
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows.item(i) as any;
              let comuna:ComunaModel = new ComunaModel(item.idcomuna,item.idprovincia,item.nombre,item.valid);
              comunas.push(comuna);
            }
            var result = {result:true,mensajes:"Comunas encontradas",comunas:comunas};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se han encontrado comunas"};
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

  public obtenerConID(idcomuna:number): Promise<Object> {
    //console.log("ComunaLocalDBService: obtenerConID();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM comuna WHERE idcomua ="+idcomuna.toString();
        //console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          //console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = rows.item(0) as any;
            //console.log(item);
            let comuna:ComunaModel = new ComunaModel(item.idcomuna,item.idprovincia,item.nombre,item.valid);

            var result = {result:true,mensajes:"Comuna encontrada",comuna:comuna};
            resolve(result);
          } else {
            var resultError = {result:false,errores:"No se ha encontrado comuna"};
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