import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Rx';

import * as moment from 'moment'; 

import { LocalDBService } from './LocalDB.service';
import { BloqueHorarioLocalDBService } from './BloqueHorarioLocalDB.service';

import { EspecialistaModel } from './../models/EspecialistaModel';
import { EspecialistaDisponibilidadModel } from './../models/EspecialistaDisponibilidadModel';
import { EspecialidadModel } from './../models/EspecialidadModel';
import { BloqueHorarioModel } from './../models/BloqueHorarioModel';

@Injectable()
export class EspecialistaDisponibilidadLocalDBService {

  constructor(private LocalDBService:LocalDBService,private BloqueHorarioLocalDBService:BloqueHorarioLocalDBService) { }

  public guardar(disponibilidades:Array<EspecialistaDisponibilidadModel>): Promise<Object> {
    console.log("guardar();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var queries = [];
        for (var i = 0; i<disponibilidades.length; i++) {
          let disponibilidad:EspecialistaDisponibilidadModel = disponibilidades[i];
          var sql = "INSERT INTO especialistadisponibilidad (idespecialista,idbloquehorario,fecha) VALUES("+disponibilidad.idespecialista+","+disponibilidad.idbloquehorario+",'"+disponibilidad.fecha+"')";
          console.info(sql);
          queries.push(sql);
        }
        queries.forEach(function(sql,index){

          tx.executeSql(sql,[],function(tx,results){
            console.log(tx,results,results.rows.length);
            if(results.insertId>0){
              var disponibilidad:EspecialistaDisponibilidadModel = new EspecialistaDisponibilidadModel();
              disponibilidad.idespecialistadisponibilidad = results.insertId;
              if(index==queries.length-1){
                var result = {result:true,mensajes:"Disponibilidad guardada correctamente"};
                resolve(result);                
              }
            } else {
              var resultError = {result:false,errores:"No se ha podido guardar una disponibilidad de especialista"};
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
    });
    return promesa;    
  }

  public editar(especialistaDisponibilidad:EspecialistaDisponibilidadModel): Promise<Object> {
    console.log("editar();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "UPDATE especialistadisponibilidad SET idespecialista ="+especialistaDisponibilidad.idespecialista+", idbloquehorario="+especialistaDisponibilidad.idbloquehorario+", fecha='"+especialistaDisponibilidad.fecha+"', WHERE idespecialistadisponibilidad = "+especialistaDisponibilidad.idespecialistadisponibilidad;
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){
            var result = {result:true,mensajes:"Disponibilidad editada correctamente",disponibilidad:especialistaDisponibilidad};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha podido editar la disponibilidad de especialista"};
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

  public eliminar(especialistaDisponibilidad:EspecialistaDisponibilidadModel): Promise<Object> {
    console.log("eliminar();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "DELETE FROM especialistadisponibilidad WHERE idespecialistadisponibilidad = "+especialistaDisponibilidad.idespecialistadisponibilidad;
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){
            var result = {result:true,mensajes:"Disponibilidad eliminada correctamente"};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha podido eliminar esta disponibilidad de especialista"};
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
  
  public obtenerConID(idespecialistadisponibilidad:number): Promise<Object> {
    console.log("obtenerConID();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT * FROM especialistadisponibilidad WHERE idespecialistadisponibilidad="+idespecialistadisponibilidad.toString();
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var item:any = results.rows.item(0) as any;
            let especialistaDisponibilidad:EspecialistaDisponibilidadModel = new EspecialistaDisponibilidadModel(item.idespecialistadisponibiliad,item.idespecialista,item.idbloquehorario,item.fecha,item.valid);
            var result = {result:true,mensajes:"Disponibilidad encontrada",disponibilidad:especialistaDisponibilidad};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han encontrado disponibilidad con ese dato"};
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

  public obtenerConEspecialistaYFecha(especialista:EspecialistaModel,fecha:string): Promise<Object> {
    console.log("obtenerConEspecialistaYFecha();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT ed.idespecialistadisponibilidad,ed.idespecialista,strftime('%d-%m-%Y', ed.fecha) AS fecha,ed.valid AS valided,bh.idbloquehorario AS idbloquehorario, bh.horainicio,bh.horatermino, bh.valid AS validbh FROM especialistadisponibilidad AS ed INNER JOIN bloquehorario AS bh ON ed.idbloquehorario = bh.idbloquehorario WHERE ed.idespecialista="+especialista.idespecialista.toString() + " AND ed.fecha='"+fecha+"' AND ed.valid=1";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var disponibilidades:Array<EspecialistaDisponibilidadModel> = new Array<EspecialistaDisponibilidadModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows.item(i) as any;
              var bloque:BloqueHorarioModel = new BloqueHorarioModel();
              bloque.idbloquehorario = item.idbloquehorario;
              bloque.horainicio = item.horainicio;
              bloque.horatermino = item.horatermino;
              bloque.valid = item.validbh;

              var especialistaDisponibilidad:EspecialistaDisponibilidadModel = new EspecialistaDisponibilidadModel(item.idespecialistadisponibilidad,item.idespecialista,item.idbloquehorario,item.fecha,item.valided);
              especialistaDisponibilidad.idbloquehorario = item.idbloquehorario;
              especialistaDisponibilidad.bloqueHorarioModel = bloque;
              disponibilidades.push(especialistaDisponibilidad);
            }
            var result = {result:true,mensajes:"Disponibilidad encontrada para la fecha "+ moment(fecha).format("DD-MM-YYYY"),disponibilidades:disponibilidades};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha encontrado disponibilidad para la fecha " +moment(fecha).format("DD-MM-YYYY")};
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

  public obtenerConEspecialistaEntreFechas(especialista:EspecialistaModel,fechaDesde:string,fechaHasta:string): Promise<Object> {
    console.log("obtenerConEspecialistaEntreFechas();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT ed.idespecialistadisponibilidad,ed.idespecialista, ed.fecha AS fecha,ed.valid AS valided,bh.idbloquehorario AS idbloquehorario, bh.horainicio,bh.horatermino, bh.valid AS validbh FROM especialistadisponibilidad AS ed INNER JOIN bloquehorario AS bh ON ed.idbloquehorario = bh.idbloquehorario WHERE ed.idespecialista="+especialista.idespecialista.toString() + " AND ed.fecha >='"+fechaDesde+"' AND ed.fecha<='"+fechaHasta+"'";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var disponibilidades:Array<EspecialistaDisponibilidadModel> = new Array<EspecialistaDisponibilidadModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows.item(i) as any;

              let bloque:BloqueHorarioModel = new BloqueHorarioModel();
              bloque.idbloquehorario = item.idbloquehorario;
              bloque.horainicio = item.horainicio;
              bloque.horatermino = item.horatermino;
              bloque.valid = item.validbh;

              let especialistaDisponibilidad:EspecialistaDisponibilidadModel = new EspecialistaDisponibilidadModel(item.idespecialistadisponibilidad,item.idespecialista,item.idbloquehorario,item.fecha,item.valided);
              especialistaDisponibilidad.idespecialistadisponibilidad = item.idespecialistadisponibilidad;
              especialistaDisponibilidad.idbloquehorario = item.idbloquehorario;
              especialistaDisponibilidad.fecha = item.fecha;
              especialistaDisponibilidad.valid = item.valided;

              especialistaDisponibilidad.bloqueHorarioModel = bloque;

              disponibilidades.push(especialistaDisponibilidad);
            }
            var result = {result:true,mensajes:"Disponibilidad encontrada entre "+moment(fechaDesde).format("DD-MM-YYYY") +" y " + moment(fechaHasta).format("DD-MM-YYYY"),disponibilidades:disponibilidades};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha encontrado disponibilidad entre " + moment(fechaDesde).format("DD-MM-YYYY") + " y " + moment(fechaHasta).format("DD-MM-YYYY")};
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

  public obtenerOcupadasEntreFechas(fechaDesde:string,fechaHasta:string): Promise<Object> {
    console.log("obtenerOcupadasEntreFechas();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT ed.idespecialistadisponibilidad,ed.idespecialista, ed.fecha AS fecha,ed.valid AS valided,bh.idbloquehorario AS idbloquehorario, bh.horainicio,bh.horatermino, bh.valid AS validbh FROM especialistadisponibilidad AS ed INNER JOIN bloquehorario AS bh ON ed.idbloquehorario = bh.idbloquehorario WHERE ed.fecha >='"+fechaDesde+"' AND ed.fecha <='"+fechaHasta+"'";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results);

          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var disponibilidades:Array<EspecialistaDisponibilidadModel> = new Array<EspecialistaDisponibilidadModel>();
            for (var i = 0; i < rows.length; i++){
              var item:any = rows.item(i) as any;

              var bloque:BloqueHorarioModel = new BloqueHorarioModel();
              bloque.idbloquehorario = item.idbloquehorario;
              bloque.horainicio = item.horainicio;
              bloque.horatermino = item.horatermino;
              bloque.valid = item.validbh;

              var especialistaDisponibilidad:EspecialistaDisponibilidadModel = new EspecialistaDisponibilidadModel(item.idespecialistadisponibilidad,item.idespecialista,item.idbloquehorario,item.fecha,item.valided);
              especialistaDisponibilidad.idespecialistadisponibilidad = item.idespecialistadisponibilidad;
              especialistaDisponibilidad.idbloquehorario = item.idbloquehorario;
              especialistaDisponibilidad.fecha = item.fecha;
              especialistaDisponibilidad.valid = item.valided;

              especialistaDisponibilidad.bloqueHorarioModel = bloque;
              disponibilidades.push(especialistaDisponibilidad);
            }

            var result = {result:true,mensajes:"Fechas ocupadas entre "+fechaDesde +" y " + fechaHasta,disponibilidades:disponibilidades};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se ha encontrado fechas ocupadas entre " +moment(fechaDesde).format("DD-MM-YYYY") + " y " + moment(fechaHasta).format("DD-MM-YYYY")};
            resolve(resultNoEncontrado);                        
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

  public obtenerDisponiblesEntreFechas(fechaDesde:string,fechaHasta:string): Promise<Object> {
    console.log("obtenerDisponiblesEntreFechas();");
    var promesa = new Promise((resolve,reject)=>{
      this.crearFechas(fechaDesde,fechaHasta).then((otraData:any)=>{
        //console.log(otraData);
        var creadas:Array<EspecialistaDisponibilidadModel> = otraData.fechas;
       
        this.obtenerOcupadasEntreFechas(fechaDesde,fechaHasta).then((data:any)=>{
          //console.log(data);            
          if(data.result){             
            var ocupadas:Array<EspecialistaDisponibilidadModel> = data.disponibilidades;
            var libres = this.filtrar(creadas,ocupadas);

            var result = {result:true,mensajes:"Fechas libres encontradas entre " + moment(fechaDesde).format("DD-MM-YYYY") +" y " + moment(fechaHasta).format("DD-MM-YYYY"),disponibilidades:libres};
            resolve(result);
          } else {
            var result = {result:true,mensajes:"Fechas libres encontradas entre " + moment(fechaDesde).format("DD-MM-YYYY") +" y " + moment(fechaHasta).format("DD-MM-YYYY"),disponibilidades:creadas};
            resolve(result);
          }

        },(dataError:any)=>{
          //console.error(dataError);
          reject(dataError);
        });

      },(dataError:any)=>{
        //console.error(dataError);
        reject(dataError);
        return false;
      });

    });

    return promesa;
  }

  private filtrar(creadas:Array<EspecialistaDisponibilidadModel>, ocupadas:Array<EspecialistaDisponibilidadModel>):Array<EspecialistaDisponibilidadModel>{
    //console.log("filtrar");
    //Find values that are in result1 but not in result2
    //https://stackoverflow.com/questions/21987909/how-to-get-the-difference-between-two-arrays-of-objects-in-javascript
    /*
    var uniqueResultOne = result1.filter(function(obj) {
    return !result2.some(function(obj2) {
        return obj.value == obj2.value;
      });
    });
    */
    var libres = creadas.filter(function (el) {
      return !ocupadas.some(function (f) {
        return f.bloqueHorarioModel.idbloquehorario == el.bloqueHorarioModel.idbloquehorario && f.fecha==el.fecha;
      });
    });
    return libres;
  }

  private crearFechas(fechaDesde:string,fechaHasta:string): Promise<Object> {
    var promesa = new Promise((resolve, reject) => {
      this.BloqueHorarioLocalDBService.obtener().then((data:any)=>{
        if(data.result){
          let bloques:Array<BloqueHorarioModel> = data.bloques;
          let inicio = new Date(fechaDesde);
          let fin = new Date(fechaHasta);
          //console.log(inicio.toUTCString(),fin.toUTCString());
          let semana = this.obtenerFechasSinFinde(inicio,fin);            
          var fechas = new Array<EspecialistaDisponibilidadModel>();
          for (var i = 0; i < semana.length; ++i) {
            let item:Date = semana[i];
            for (var j = 0; j < bloques.length; ++j) {
              var bloque:BloqueHorarioModel = bloques[j];
              var especialistaDisponibilidad:EspecialistaDisponibilidadModel = new EspecialistaDisponibilidadModel();
              especialistaDisponibilidad.idbloquehorario = bloque.idbloquehorario;
              especialistaDisponibilidad.fecha = moment(item).utc(false).format("YYYY-MM-DD");
              especialistaDisponibilidad.bloqueHorarioModel = bloque;
              fechas.push(especialistaDisponibilidad);
            }
          }
          var result = {result:true,mensajes:"Fechas creadas entre "+moment(fechaDesde).format("DD-MM-YYYY") +" y " + moment(fechaHasta).format("DD-MM-YYYY"),fechas:fechas};
          resolve(result);
        } else {
          var resultNoEncontrado = {result:false,errores:"No se ha encontrado bloques horarios"};
          reject(resultNoEncontrado);                        
        }
      },(dataError:any)=>{
        reject(dataError);            
        return false;
      });
    });
    return promesa;
  }
  
  private obtenerFechasSinFinde(inicio:Date,fin:Date): Array<Date> {
    var todas:Array<Date> = new Array<Date>();
    var start = moment(inicio, 'YYYY-MM-DD').utc(false);
    let end = moment(fin, 'YYYY-MM-DD').utc(false);
    //Ojo con la zona horario. Se usa UTC
    while (start <= end) {
      if (start.format('ddd') !== 'Sat' && start.format('ddd') !== 'Sun'){
        //console.log(start.format("ddd"));
        //console.log(start.utc(false).format("YYYY-MM-DD"));
        todas.push(new Date(start.utc(false).format("YYYY-MM-DD")));
      }
      start = moment(start, 'YYYY-MM-DD').utc(false).add(1, 'days');
    }
    return todas;
  }


}