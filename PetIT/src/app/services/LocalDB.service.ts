import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import "rxjs/add/observable/of";

import { UsuarioModel } from './../models/UsuarioModel';

@Injectable()
export class LocalDBService {

  public constUsuario:string = "DBLOCAL";

  constructor() { 
    //console.log("LocalDBService");

    const db: Database = this.obtenerDB();
    if(!db){
        console.log('Error al conectar a la base de datos.');
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
      console.log('Conexión OK a la DB.');
      return db;
    }
  }

  private crearTablas():void {
    //console.log("crearTablas");
    var me = this as LocalDBService;
    var db = this.obtenerDB();
    db.transaction(function (tx){
      var queries = [
        'CREATE TABLE "usuario" (  `idusuario`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,  `idrol`  INTEGER NOT NULL,  `nombre`  TEXT,  `rut`  TEXT NOT NULL UNIQUE,  `password`  TEXT NOT NULL,  `valid`  INTEGER NOT NULL DEFAULT 1)',
        'CREATE TABLE "tipomascota" ( `idtipomascota` INTEGER PRIMARY KEY AUTOINCREMENT, `nombre` TEXT NOT NULL, `valid` INTEGER NOT NULL )',
        'CREATE TABLE "rol" ( `idrol` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `rol` TEXT NOT NULL, `valid` INTEGER )',
        'CREATE TABLE "raza" ( `idraza` INTEGER PRIMARY KEY AUTOINCREMENT, `nombre` TEXT NOT NULL, `valid` INTEGER DEFAULT 1 )',
        'CREATE TABLE "notificacion" ( `idnotificacion` INTEGER PRIMARY KEY AUTOINCREMENT, `idusuario` INTEGER NOT NULL, `titulo` TEXT, `imagen` TEXT, `mensaje` INTEGER, `valid` INTEGER )',
        'CREATE TABLE "mascota" ( `rutmascota` TEXT NOT NULL UNIQUE, `idtipomascota` INTEGER NOT NULL, `idraza` INTEGER NOT NULL, `rutdueno` TEXT NOT NULL, `nombre` TEXT NOT NULL, `peso` TEXT, `edad` TEXT, `valid` INTEGER )',
        'CREATE TABLE "hora" ( `idhora` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `idespecialista` INTEGER NOT NULL, `hora` TEXT NOT NULL, `fecha` TEXT, `valid` INTEGER NOT NULL )',
        'CREATE TABLE "especialista" ( `idespecialista` INTEGER PRIMARY KEY AUTOINCREMENT, `idespecialidad` INTEGER NOT NULL, `rut` TEXT, `nombres` TEXT NOT NULL, `apellidopaterno` TEXT, `apellidomaterno` TEXT, `correo` TEXT, `direccion` TEXT, `comuna` TEXT, `valid` INTEGER )',
        'CREATE TABLE "especialidad" ( `idespecialidad` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `nombre` TEXT NOT NULL, `valid` INTEGER )',
        'CREATE TABLE "duenomascota" ( `rutdueno` TEXT NOT NULL UNIQUE, `idusuario` INTEGER, `nombres` TEXT NOT NULL, `apellidopaterno` TEXT NOT NULL, `apellidomaterno` TEXT NOT NULL, `comuna` TEXT NOT NULL, `direccion` TEXT NOT NULL, `telefono` TEXT NOT NULL, `correo` TEXT NOT NULL, `valid` INTEGER, PRIMARY KEY(`rutdueno`) )',
        'CREATE TABLE "cita" ( `idcita` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `rutmascota` TEXT, `idespecialista` INTEGER NOT NULL, `idhora` TEXT NOT NULL, `origen` INTEGER, `valid` INTEGER DEFAULT 1 )'
      ]

      queries.forEach(function(query,index){
        tx.executeSql(query,[],function(tx,results){
          console.log(tx,results);
        },function(tx,results){
          //console.info(tx,results);
          return false;
        });
      });
      
      me.poblarTablas();

    });
  }

  private poblarTablas(): void {
    //console.log("popularTablas");
    var db = this.obtenerDB();
    db.transaction(function (tx) {
      var queries = [
        "INSERT INTO `usuario` (idusuario,idrol,nombre,rut,password,valid) VALUES (1,1,'Doris Napolitano','59290282','dorisnapolitano',1), (2,2,'Hernán Beiza','166926688','9040207',1), (3,3,'Andrés','132699461','andres1234',1), (4,2,'Graciela Baldrich','173158246','admin1234',1), (5,3,'María José','10773614k','cote1234',1), (6,3,'Cristián Contreras','139184718','cristian1234',1)",
        "INSERT INTO `tipomascota` (idtipomascota,nombre,valid) VALUES (1,'Tipo 1',1), (2,'Tipo 2',1)",
        "INSERT INTO `rol` (idrol,rol,valid) VALUES (1,'Dueño Veterinaria',1), (2,'Recepcionista',1), (3,'Dueño Mascota',1)",
        "INSERT INTO `raza` (idraza,nombre,valid) VALUES (1,'Raza 1',1), (2,'Raza 2',1), (3,'Raza 3',1)",
        "INSERT INTO `notificacion` (idnotificacion,idusuario,titulo,imagen,mensaje,valid) VALUES (1,5,'Título 1','imagen.jpg','Mensaje de la notificación',1), (2,6,'Título 2','imagen2.jpg','Mensaje 2',1), (3,6,'Título 3','imagen3.jpg','Mensaje 3',2)",
        "INSERT INTO `mascota` (rutmascota,idtipomascota,idraza,rutdueno,nombre,peso,edad,valid) VALUES (1,1,1,'173158246','Tody','10','10',1), (2,1,1,'10773614k','Mamut','2','5',1), (3,1,2,'139184718','Fideo','5','4',1), (4,1,3,'139184718','Luna','1','1',1)",
        "INSERT INTO `hora` (idhora,idespecialista,hora,fecha,valid) VALUES (1,1,'10:00','2018-06-22',1), (2,1,'10:30','2018-06-22',1), (3,2,'16:00','2018-06-22',1), (4,2,'16:30','2018-06-22',1), (5,3,'20:00','2018-06-22',1), (6,3,'20:30','2018-06-22',1), (7,3,'21:00','2018-06-22',1)",
        "INSERT INTO `especialista` (idespecialista,idespecialidad,rut,nombres,apellidopaterno,apellidomaterno,correo,direccion,comuna,valid) VALUES (1,1,'59530534 ','Joseph','Jimenez',NULL,'joseph@vet.cl',NULL,NULL,1), (2,1,'212385255','Claudio','Igor',NULL,'claudio@vet.cl','',NULL,1), (3,2,'51428250','Daniel','Águila',NULL,'daniel@vet.cl','',NULL,1), (4,2,'10275736k','Hans','Poffald',NULL,'hans @vet.cl',NULL,NULL,1)",
        "INSERT INTO `especialidad` (idespecialidad,nombre,valid) VALUES (1,'General',1), (2,'Peluquería',1)",
        "INSERT INTO `duenomascota` (rutdueno,idusuario,nombres,apellidopaterno,apellidomaterno,comuna,direccion,telefono,correo,valid) VALUES ('10773614k',5,'María','José','Napolitano','La Florida','Vicuña Mackenna #10082 ','+56123413','cote@ugm.cl',1), ('139184718',6,'Cristian','Contreras','','Pocuro','3 Poniente 8413','+56123413','cristian@ugm.cl',1), ('173158246',4,'Graciela','Baldrich','Guerrero','La Florida','Pasaje Palqui #874','+56123413','graciela@ugm.cl',1)",
        "INSERT INTO `cita` (idcita,rutmascota,idespecialista,idhora,origen,valid) VALUES (1,'1',1,'1',1,1), (2,'2',2,'2',1,1), (3,'3',2,'3',2,1)"
      ]
      queries.forEach(function(sql,index){
        tx.executeSql(sql,[],function(tx,results){
          //console.log(tx,results);
        },function(tx,results){
          //console.info(tx,results);
          return false;
        });
      });

    });
  }

}