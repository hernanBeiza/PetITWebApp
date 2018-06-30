import { Injectable } from '@angular/core';

import { DuenoMascotaModel } from './../models/DuenoMascotaModel';
import { LocalDBService } from './LocalDB.service';

import { HoraModel } from './../models/HoraModel';
import { EspecialistaModel } from './../models/EspecialistaModel';

@Injectable()
export class HoraLocalDBService {

  constructor(private LocalDBService:LocalDBService) { }
 
  public obtenerConEspecialistayFecha(especialista:EspecialistaModel,fecha:string): Promise<Object> {
    console.log("HoraLocalDBService: obtenerConEspecialistayFecha();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "SELECT ho.*,es.* FROM hora AS ho INNER JOIN especialista AS es ON es.idespecialista = ho.idespecialista WHERE ho.idespecialista = "+especialista.idespecialista + " AND fecha='"+fecha+"' AND ho.valid=1";
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rows.length>0){
            var rows:SQLResultSetRowList = results.rows as SQLResultSetRowList;
            var horas:Array<HoraModel> = new Array<HoraModel>();
            for (var i = 0; i < results.rows.length; i++){
              var item:any = results.rows.item(i) as any;
              let especialista:EspecialistaModel = new EspecialistaModel(item.idespecialista,item.idespecialidad,item.rut,item.nombres,item.apellidopaterno,item.apellidomaterno,item.correo,item.direccion,item.comuna,item.valid);
              let hora:HoraModel = new HoraModel(item.idhora,item.idespecialista,item.fecha,item.hora,item.valid);
              hora.especialistaModel = especialista;
              horas.push(hora);
            }
            var result = {result:true,mensajes:"Horas encontradas",horas:horas};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han encontrado horas para esta fecha"};
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

  public anular(hora:HoraModel): Promise<Object>{
    console.log("HoraLocalDBService: anular();");
    var db = this.LocalDBService.obtenerDB();
    var promesa = new Promise((resolve, reject) => {
      db.transaction(function (tx){
        var sql = "UPDATE hora SET valid = 1 WHERE idhora = "+hora.idhora;
        console.info(sql);
        tx.executeSql(sql,[],function(tx,results){
          console.log(tx,results,results.rows.length);
          if(results.rowsAffected>0){
            var result = {result:true,mensajes:"Hora anulada correctamente"};
            resolve(result);
          } else {
            var resultNoEncontrado = {result:false,errores:"No se han podido anular la hora"};
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