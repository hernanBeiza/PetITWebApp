import { Injectable } from '@angular/core';

import { TipoMascotaModel } from './../models/TipoMascotaModel';

import { LocalDBService } from './LocalDB.service';

@Injectable()
export class TipoMascotaLocalDBService {

	constructor(private LocalDBService:LocalDBService) { }
 
	public obtener(): Promise<Object> {
		var db = this.LocalDBService.obtenerDB();
		var promesa = new Promise((resolve, reject) => {
		  db.transaction(function (tx){
		    var sql = "SELECT * FROM tipomascota"
		    console.info(sql);
		    tx.executeSql(sql,[],function(tx,results){
				console.log(tx,results,results.rows.length);
				if(results.rows.length>0){
			        var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
			        var tipos:Array<TipoMascotaModel> = new Array<TipoMascotaModel>();
			        for (var i = 0; i < results.rows.length; i++){
						var item:any = results.rows[i] as any;
						var model:TipoMascotaModel = new TipoMascotaModel(item.idtipomascota,item.nombre,item.valid);
						tipos.push(model);
			        }
		        	var result = {result:true,mensajes:"Mascotas encontradas",tipos:tipos};
					resolve(result);
				} else {
		    	    var resultNoEncontrado = {result:false,errores:"No se han encontrado tipos"};
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
	        var sql = "SELECT * FROM tipomascota WHERE idtipomascota = "+idtipomascota;
	        console.info(sql);
	        tx.executeSql(sql,[],function(tx,results){
	          console.log(tx,results,results.rows.length);
	          if(results.rows.length>0){
	            var item:any = results.rows[0] as any;
				var model:TipoMascotaModel = new TipoMascotaModel(item.idtipomascota,item.nombre,item.valid);
	            var result = {result:true,mensajes:"Tipo encontrado",tipomascota:model};
	            resolve(result);
	          } else {
	            var resultNoEncontrado = {result:false,errores:"No se ha encontrado tipo con esos datos"};
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