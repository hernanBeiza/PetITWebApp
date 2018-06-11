import { Injectable } from '@angular/core';

import { RazaModel } from './../models/RazaModel';

import { LocalDBService } from './LocalDB.service';

@Injectable()
export class RazaLocalDBService {

	constructor(private LocalDBService:LocalDBService) { }
 
	public obtener(): Promise<Object> {
		var db = this.LocalDBService.obtenerDB();
		var promesa = new Promise((resolve, reject) => {
		  db.transaction(function (tx){
		    var sql = "SELECT * FROM raza"
		    console.info(sql);
		    tx.executeSql(sql,[],function(tx,results){
				console.log(tx,results,results.rows.length);
				if(results.rows.length>0){
			        var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
			        var razas:Array<RazaModel> = new Array<RazaModel>();
			        for (var i = 0; i < results.rows.length; i++){
						var item:any = results.rows[i] as any;
						var model:RazaModel = new RazaModel(item.idraza,item.nombre,item.valid);
						razas.push(model);
			        }
		        	var result = {result:true,mensajes:"Razas encontradas",razas:razas};
					resolve(result);
				} else {
		    	    var resultNoEncontrado = {result:false,errores:"No se han encontradon razas"};
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

	public obtenerConID(idtipomascota:number): Promise<Object> {
	    var db = this.LocalDBService.obtenerDB();
	    var promesa = new Promise((resolve, reject) => {
	      db.transaction(function (tx){
	        var sql = "SELECT * FROM raza WHERE idraza = "+idtipomascota;
	        console.info(sql);
	        tx.executeSql(sql,[],function(tx,results){
	          console.log(tx,results,results.rows.length);
	          if(results.rows.length>0){
	            var item:any = results.rows[0] as any;
				var model:RazaModel = new RazaModel(item.idraza,item.nombre,item.valid);
	            var result = {result:true,mensajes:"Raza encontrada",raza:model};
	            resolve(result);
	          } else {
	            var resultNoEncontrado = {result:false,errores:"No se ha encontrado raza con esos datos"};
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