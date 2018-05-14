import { Injectable } from '@angular/core';

import { MascotaModel } from './../models/MascotaModel';

import { LocalDBService } from './LocalDB.service';

@Injectable()
export class MascotaLocalDBService {

	constructor(private LocalDBService:LocalDBService) { }
 
	public guardar(mascota:MascotaModel): Promise<Object> {
	    var db = this.LocalDBService.obtenerDB();
	    var promesa = new Promise((resolve, reject) => {
	      db.transaction(function (tx){
	        var sql = "INSERT INTO mascota (iddueno,nombre) VALUES("+mascota.iddueno+",'"+mascota.nombre+"')";
	        console.info(sql);
	        tx.executeSql(sql,[],function(tx,results){
	          console.log(tx,results,results.rows.length);
	          if(results.insertId>0){
	            var result = {result:true,mensajes:"Mascota guardada correctamente"};
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

	public modificar(mascota:MascotaModel): Promise<Object> {
		var db = this.LocalDBService.obtenerDB();
		var promesa = new Promise((resolve, reject) => {
		  db.transaction(function (tx){
		    var sql = "UPDATE mascota SET iddueno="+mascota.iddueno+", nombre='"+mascota.nombre+"' WHERE iddueno = "+mascota.idmascota;
		    console.info(sql);
		    tx.executeSql(sql,[],function(tx,results){
		      console.log(tx,results,results.rows.length);
		      if(results.rowsAffected>0){
		        var result = {result:true,mensajes:"Mascota modificada correctamente"};
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

	public obtener(): Promise<Object> {
		var db = this.LocalDBService.obtenerDB();
		var promesa = new Promise((resolve, reject) => {
		  db.transaction(function (tx){
		    var sql = "SELECT * FROM mascota"
		    console.info(sql);
		    tx.executeSql(sql,[],function(tx,results){
				console.log(tx,results,results.rows.length);
				if(results.rows.length>0){
			        var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
			        var mascotas:Array<MascotaModel> = new Array<MascotaModel>();
			        for (var i = 0; i < results.rows.length; i++){
			          var item:any = results.rows[i] as any;
			          var model:MascotaModel = new MascotaModel(item.idmascota,item.iddueno,item.nombre);
			          mascotas.push(model);
			        }
		        	var result = {result:true,mensajes:"Masctoas encontradas",mascotas:mascotas};
					resolve(result);
				} else {
		    	    var resultNoEncontrado = {result:false,errores:"No se han encontrado mascotas"};
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

	public obtenerConID(idmascota:number): Promise<Object> {
	    var db = this.LocalDBService.obtenerDB();
	    var promesa = new Promise((resolve, reject) => {
	      db.transaction(function (tx){
	        var sql = "SELECT * FROM mascota WHERE idmascota = "+idmascota.toString();
	        console.info(sql);
	        tx.executeSql(sql,[],function(tx,results){
	          console.log(tx,results,results.rows.length);
	          if(results.rows.length>0){
	            var item:any = results.rows[0] as any;
	            var mascota:MascotaModel = new MascotaModel(item.idmascota,item.iddueno,item.nombre);
	            var result = {result:true,mensajes:"Mascota encontrada",mascota:mascota};
	            resolve(result);
	          } else {
	            var resultNoEncontrado = {result:false,errores:"No se ha encontrado mascota con esos datos"};
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