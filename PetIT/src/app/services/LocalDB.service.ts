import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import "rxjs/add/observable/of";

import { UsuarioModel } from './../models/UsuarioModel';

@Injectable()
export class LocalDBService {

  public constUsuario:string = "DBLOCAL";

  constructor() { 
    console.log("LocalDBService");

    const db: Database = window.openDatabase('petiddb', '1.0', 'petiddb', 2 * 1024 * 1024);
    if(!db){
        console.log('Failed to connect to database.');
    } else {
      this.crearTablas();
    }
  }

  public obtenerDB():Database {
    //console.log("obtenerDB");
    const db: Database = window.openDatabase('petiddb', '1.0', 'petiddb', 2 * 1024 * 1024);
    if(!db){
        console.log('Error al conectar a la base de datos.');
        return null;
    } else {
      return db;
    }
  }

  private crearTablas():void {
    console.log("crearTablas");
    var me = this as LocalDBService;
    var db = this.obtenerDB();
    db.transaction(function (tx){
      var queries = [
      "CREATE TABLE 'cita' ( `idcita` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `idmascota` INTEGER NOT NULL, `idespecialista` INTEGER NOT NULL, `fecha` TEXT NOT NULL )",
      "CREATE TABLE 'dueno' ( `iddueno` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `idusuario` INTEGER, `rut` TEXT NOT NULL UNIQUE, `nombre` TEXT NOT NULL, `direccion` TEXT )",
      "CREATE TABLE `especialidad` ( `idespecialidad` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `nombre` TEXT NOT NULL )",
      "CREATE TABLE `especialista` ( `idespecialista` INTEGER PRIMARY KEY AUTOINCREMENT, `idespecialidad` INTEGER NOT NULL, `nombre` TEXT NOT NULL )",
      "CREATE TABLE 'mascota' ( `idmascota` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `iddueno` INTEGER NOT NULL, `nombre` INTEGER NOT NULL )",
      "CREATE TABLE 'usuario' ( `idusuario` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `idusuariorol` INTEGER NOT NULL, `usuario` TEXT NOT NULL UNIQUE, `contrasena` TEXT NOT NULL, `nombre` TEXT, `valid` INTEGER NOT NULL DEFAULT 1 )",
      "CREATE TABLE `usuariorol` ( `idusuariorol` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `rol` TEXT NOT NULL )"
      ]

      queries.forEach(function(query,index){
        tx.executeSql(query,[],function(tx,results){
          console.log(tx,results);
        },function(tx,results){
          //console.error(tx,results);
          return false;
        });
      });
      
      me.popularTablas();

    });
  }

  private popularTablas(): void {
    console.log("popularTablas");
    var db = this.obtenerDB();
    db.transaction(function (tx) {
      var queries = [
        "INSERT INTO `usuariorol` VALUES (1,'Dueño Veterinaria'), (2,'Recepcionista'), (3,'Dueño Mascota'); ",
        "INSERT INTO `usuario` VALUES (1,1,'59290282','dorisnapolitano','Doris Napolitano',1), (2,2,'166926688','9040207','Hernán Beiza',1), (3,3,'132699461','andres','Andrés',1), (4,2,'173158246','admin','Graciela Baldrich',1), (5,3,'10773614k','cote','María José',1), (6,3,'139184718','cristian','Cristián Contreras',1)",
        "INSERT INTO `mascota` VALUES (1,1,'Tody'), (2,2,'Mamut'), (3,3,'Fideo'), (4,3,'Luna')",
        "INSERT INTO `especialista` VALUES (1,1,'Joseph Jimenez'), (2,1,'Claudio Igor'), (3,2,'Daniel Águila'), (4,2,'Hans Poffald')",
        "INSERT INTO `especialidad` VALUES (1,'General'), (2,'Peluquería')",
        "INSERT INTO `dueno` VALUES (1,4,'173158246','Graciela Baldrich','Pasaje Palqui #874'), (2,5,'10773614k','María José','Vicuña Mackenna #10082'), (3,6,'139184718','Cristian Contreras','3 Poniente 8413')",
        "INSERT INTO `cita` VALUES (1,1,1,'2018-05-10 10:00'), (2,2,2,'2018-05-10 11:30'), (3,2,2,'2018-05-20 11:30')"
      ];
      queries.forEach(function(sql,index){
        tx.executeSql(sql,[],function(tx,results){
          //console.log(tx,results);
        },function(tx,results){
          //console.error(tx,results);
          return false;
        });
      });

    });
  }

  public borrarTodo():boolean {

    return true;
  }


}