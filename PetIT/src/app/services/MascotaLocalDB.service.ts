import { Injectable } from '@angular/core';

import { MascotaModel } from './../models/MascotaModel';
import { RazaModel } from './../models/RazaModel';
import { TipoMascotaModel } from './../models/TipoMascotaModel';
import { DuenoMascotaModel } from './../models/DuenoMascotaModel';

import { LocalDBService } from './LocalDB.service';

@Injectable()
export class MascotaLocalDBService {

	constructor(private LocalDBService:LocalDBService) { }
 
	public guardar(mascota:MascotaModel): Promise<Object> {
	    var db = this.LocalDBService.obtenerDB();
	    var promesa = new Promise((resolve, reject) => {
	      db.transaction(function (tx){
	        var sql = "INSERT INTO mascota (rutmascota,idtipomascota,idraza,rutdueno,nombre,peso,edad) VALUES('"+mascota.rutmascota+"','"+mascota.idtipomascota+"','"+mascota.idraza+"','"+mascota.rutdueno+"','"+mascota.nombre+"','"+mascota.peso+"','"+mascota.edad+"')";
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
		console.log("modificar();");
		console.log(mascota);
		
		var db = this.LocalDBService.obtenerDB();
		var promesa = new Promise((resolve, reject) => {
		  db.transaction(function (tx){
		    var sql = "UPDATE mascota SET idtipomascota="+mascota.idtipomascota+", idraza="+mascota.idraza+", rutdueno='"+mascota.rutdueno+"', nombre='"+mascota.nombre+"', peso="+mascota.peso+", edad="+mascota.edad+" WHERE rutmascota = '"+mascota.rutmascota+"'";
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
		    var sql = "SELECT ma.*,tp.nombre as nombreTipoMascota,ra.nombre AS nombreRaza FROM mascota AS ma INNER JOIN tipomascota AS tp ON ma.idtipomascota = tp.idtipomascota INNER JOIN raza AS ra ON ma.idraza = ra.idraza"
		    console.info(sql);
		    tx.executeSql(sql,[],function(tx,results){
				console.log(tx,results,results.rows.length);
				if(results.rows.length>0){
			        var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
			        var mascotas:Array<MascotaModel> = new Array<MascotaModel>();
			        for (var i = 0; i < results.rows.length; i++){
						var item:any = results.rows.item(i) as any;
						var model:MascotaModel = new MascotaModel(item.rutmascota,item.idtipomascota,item.idraza,item.rutdueno,item.nombre,item.peso,item.edad,item.valid); 
          		        mascotas.push(model);
			        }
		        	var result = {result:true,mensajes:"Mascotas encontradas",mascotas:mascotas};
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

	public obtenerConRut(rutmascota:string): Promise<Object> {
	    var db = this.LocalDBService.obtenerDB();
	    var promesa = new Promise((resolve, reject) => {
			db.transaction(function (tx){
		        var sql = "SELECT ma.*,tp.nombre as nombreTipoMascota,ra.nombre AS nombreRaza FROM mascota AS ma INNER JOIN tipomascota AS tp ON ma.idtipomascota = tp.idtipomascota INNER JOIN raza AS ra ON ma.idraza = ra.idraza WHERE ma.rutmascota = '"+rutmascota+"'";
		        console.info(sql);
		        tx.executeSql(sql,[],function(tx,results){
					console.log(tx,results,results.rows.length);
					if(results.rows.length>0){
				        var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
				        var mascotas:Array<MascotaModel> = new Array<MascotaModel>();
				        for (var i = 0; i < results.rows.length; i++){
							var item:any = results.rows.item(i) as any;
							var raza:RazaModel = new RazaModel();
							raza.nombre = item.nombreRaza;
							var tipoMascota:TipoMascotaModel = new TipoMascotaModel();
							tipoMascota.nombre = item.nombreTipoMascota;
							var model:MascotaModel = new MascotaModel(item.rutmascota,item.idtipomascota,item.idraza,item.rutdueno,item.nombre,item.peso,item.edad,item.valid); 
							model.tipoMascotaModel = tipoMascota;
							model.razaModel = raza;
	          		        mascotas.push(model);
				        }
	    	            var result = {result:true,mensajes:"Mascotas encontradas",mascota:mascotas[0]};
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

	public obtenerConNombre(nombre:string): Promise<Object> {
	    var db = this.LocalDBService.obtenerDB();
	    var promesa = new Promise((resolve, reject) => {
			db.transaction(function (tx){
		        var sql = "SELECT ma.*,tp.nombre as nombreTipoMascota,ra.nombre AS nombreRaza FROM mascota AS ma INNER JOIN tipomascota AS tp ON ma.idtipomascota = tp.idtipomascota INNER JOIN raza AS ra ON ma.idraza = ra.idraza WHERE ma.nombre LIKE '"+nombre+"'";
		        console.info(sql);
		        tx.executeSql(sql,[],function(tx,results){
					console.log(tx,results,results.rows.length);
					if(results.rows.length>0){
				        var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
				        var mascotas:Array<MascotaModel> = new Array<MascotaModel>();
				        for (var i = 0; i < results.rows.length; i++){
							var item:any = results.rows.item(i) as any;
							var raza:RazaModel = new RazaModel();
							raza.nombre = item.nombreRaza;
							var tipoMascota:TipoMascotaModel = new TipoMascotaModel();
							tipoMascota.nombre = item.nombreTipoMascota;
							var model:MascotaModel = new MascotaModel(item.rutmascota,item.idtipomascota,item.idraza,item.rutdueno,item.nombre,item.peso,item.edad,item.valid); 
							model.tipoMascotaModel = tipoMascota;
							model.razaModel = raza;
	          		        mascotas.push(model);
				        }
	    	            var result = {result:true,mensajes:"Mascotas encontradas",mascotas:mascotas};
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

	public obtenerConDueno(dueno:DuenoMascotaModel): Promise <Object> {
	    var db = this.LocalDBService.obtenerDB();
	    var promesa = new Promise((resolve, reject) => {
			db.transaction(function (tx){
		        var sql = "SELECT ma.*,tp.nombre as nombreTipoMascota,ra.nombre AS nombreRaza FROM mascota AS ma INNER JOIN tipomascota AS tp ON ma.idtipomascota = tp.idtipomascota INNER JOIN raza AS ra ON ma.idraza = ra.idraza WHERE ma.rutdueno = '"+dueno.rutdueno+"'";
		        console.info(sql);
		        tx.executeSql(sql,[],function(tx,results){
					console.log(tx,results,results.rows.length);
					if(results.rows.length>0){
				        var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
				        var mascotas:Array<MascotaModel> = new Array<MascotaModel>();
				        for (var i = 0; i < results.rows.length; i++){
							var item:any = results.rows.item(i) as any;
							console.log(item);
							var raza:RazaModel = new RazaModel();
							raza.nombre = item.nombreRaza;
							var tipoMascota:TipoMascotaModel = new TipoMascotaModel();
							tipoMascota.nombre = item.nombreTipoMascota;
							var model:MascotaModel = new MascotaModel(item.rutmascota,item.idtipomascota,item.idraza,item.rutdueno,item.nombre,item.peso,item.edad,item.valid); 
							model.tipoMascotaModel = tipoMascota;
							model.razaModel = raza;
	          		        mascotas.push(model);
				        }
	    	            var result = {result:true,mensajes:"Mascotas encontradas",mascotas:mascotas};
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