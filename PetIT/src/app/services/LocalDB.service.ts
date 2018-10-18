import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import "rxjs/add/observable/of";

@Injectable()
export class LocalDBService {

  public constUsuario:string = "DBLOCAL";

  constructor() { 
    //console.log("LocalDBService");

    const db: Database = this.obtenerDB();
    if(!db){
        console.error('Error al conectar a la base de datos.');
    } else {
      this.crearTablas();
    }
  }

  public obtenerDB():Database {
    //console.log("obtenerDB");
    const db: Database = window.openDatabase('petiddb', '1.0', 'petiddb', 2 * 1024 * 1024);
    if(!db){
       // console.error('Error al conectar a la base de datos.');
        return null;
    } else {
      //console.log('Conexión OK a la DB.');
      return db;
    }
  }

  private crearTablas():void {
    //console.log("crearTablas");
    var me = this as LocalDBService;
    var db = this.obtenerDB();
    db.transaction(function (tx){
      var queries = [
        "CREATE TABLE IF NOT EXISTS `usuario` ( `idusuario` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `idrol` INTEGER NOT NULL, `nombre` TEXT, `rut` TEXT NOT NULL UNIQUE, `password` TEXT NOT NULL, `valid` INTEGER NOT NULL DEFAULT 1 )",
        "CREATE TABLE IF NOT EXISTS `tipomascota` ( `idtipomascota` INTEGER PRIMARY KEY AUTOINCREMENT, `nombre` TEXT NOT NULL, `valid` INTEGER NOT NULL )",
        "CREATE TABLE IF NOT EXISTS `rol` ( `idrol` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `nombre` TEXT NOT NULL, `valid` INTEGER )",
        "CREATE TABLE IF NOT EXISTS `raza` ( `idraza` INTEGER PRIMARY KEY AUTOINCREMENT, `nombre` TEXT NOT NULL, `valid` INTEGER DEFAULT 1 )",
        "CREATE TABLE IF NOT EXISTS `origen` ( `idorigen` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `nombre` TEXT NOT NULL, `valid` INTEGER NOT NULL )",
        "CREATE TABLE IF NOT EXISTS `notificacion` ( `idnotificacion` INTEGER PRIMARY KEY AUTOINCREMENT, `idusuario` INTEGER NOT NULL, `titulo` TEXT, `imagen` TEXT, `mensaje` INTEGER, `fecha` TEXT, `valid` INTEGER )",
        "CREATE TABLE IF NOT EXISTS `mascota` (  `rutmascota`  TEXT NOT NULL,  `idtipomascota`  INTEGER NOT NULL,  `idraza`  INTEGER NOT NULL,`rutdueno`  TEXT NOT NULL,  `nombre`  TEXT NOT NULL,  `peso`  TEXT,  `edad`  TEXT,  `valid`  INTEGER,  PRIMARY KEY(`rutmascota`))",        
        "CREATE TABLE IF NOT EXISTS `hora` ( `idhora` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `idespecialista` INTEGER NOT NULL, `hora` TEXT NOT NULL, `fecha` TEXT, `valid` INTEGER NOT NULL )",
        "CREATE TABLE IF NOT EXISTS `especialista` ( `idespecialista` INTEGER PRIMARY KEY AUTOINCREMENT, `idespecialidad` INTEGER NOT NULL, `rut` TEXT, `nombres` TEXT NOT NULL, `apellidopaterno` TEXT, `apellidomaterno` TEXT, `correo` TEXT, `direccion` TEXT, `idcomuna` INTEGER, `telefono` TEXT, `valid` INTEGER )",
        "CREATE TABLE IF NOT EXISTS `especialidad` ( `idespecialidad` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `nombre` TEXT NOT NULL, `valid` INTEGER );",
        "CREATE TABLE IF NOT EXISTS `duenomascota` ( `rutdueno` TEXT NOT NULL UNIQUE, `idusuario` INTEGER, `nombres` TEXT NOT NULL, `apellidopaterno` TEXT NOT NULL, `apellidomaterno` TEXT NOT NULL, `idcomuna` INTEGER NOT NULL, `direccion` TEXT NOT NULL, `telefono` TEXT NOT NULL, `correo` TEXT NOT NULL, `valid` INTEGER, PRIMARY KEY(`rutdueno`) )", 
        "CREATE TABLE IF NOT EXISTS `comuna` ( `idcomuna` INTEGER NOT NULL, `idprovincia` INTEGER NOT NULL, `nombre` INTEGER NOT NULL, `valid` INTEGER NOT NULL, PRIMARY KEY(`idcomuna`) )",
        "CREATE TABLE IF NOT EXISTS `cita` ( `idcita` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `rutmascota` TEXT, `idespecialista` INTEGER NOT NULL, `idhora` TEXT NOT NULL, `idorigen` INTEGER NOT NULL, `valid` INTEGER DEFAULT 1 )",
        "CREATE TABLE IF NOT EXISTS `bloquehorario` (`idbloquehorario`  INTEGER PRIMARY KEY AUTOINCREMENT,  `horainicio`  TEXT, `horatermino`  TEXT, `valid`  INTEGER NOT NULL DEFAULT 1)",
        "CREATE TABLE IF NOT EXISTS `especialistadisponibilidad` ( `idespecialistadisponibilidad`  INTEGER PRIMARY KEY AUTOINCREMENT,  `idespecialista`  INTEGER NOT NULL,  `idbloquehorario`  INTEGER NOT NULL,  `fecha`  TEXT,  `valid`  INTEGER NOT NULL DEFAULT 1);"
      ];

      queries.forEach(function(query,index){
        tx.executeSql(query,[],function(tx,results){
          //console.log(tx,results);
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
        "INSERT INTO `usuario` VALUES (1,1,'Doris Napolitano','59290282','dorisnapolitano',1), (2,2,'Hernán Beiza','166926688','9040207',1), (3,3,'Andrés','132699461','andres1234',1), (4,2,'Graciela Baldrich','173158246','admin1234',1), (5,3,'María José','10773614K','cote1234',1), (6,3,'Cristián Contreras','139184718','cristian1234',1)",
        "INSERT INTO `tipomascota` VALUES (1,'Tipo 1',1), (2,'Tipo 2',1)",
        "INSERT INTO `rol` VALUES (1,'Dueño Veterinaria',1), (2,'Recepcionista',1), (3,'Dueño Mascota',1)",
        "INSERT INTO `raza` VALUES (1,'Raza 1',1), (2,'Raza 2',1), (3,'Raza 3',1)",
        "INSERT INTO `origen` VALUES (1,'Web',1), (2,'Recepcionista',1), (3,'App Móvil',1)",
        "INSERT INTO `notificacion` VALUES (1,5,'Día de Perros','http://bymayra.com/sites/default/files/styles/large/public/blog/mayra_cartel_dia_de_perros.jpg?itok=3U1JcfUk','Mensaje de la notificación','2018-06-20',1),(2,6,'Día del Perro en Jesús María','https://erikazava.files.wordpress.com/2012/08/flyer-de-municipalidad-de-jesus-maria-dia-del-perro-en-julio1.jpg','Mensaje 2','2018-05-20',1), (3,6,'Can Party','http://www.espaciodogma.com/blog/wp-content/uploads/2012/05/Flyer-II-Can-Party-web.jpg','Mensaje 3','2018-05-01',2)",
        "INSERT INTO `mascota` VALUES ('111111111',1,1,'173158246','Tody','10','10',1), ('222222222',1,2,'10773614K','Mamut','2','5',1),  ('333333333',1,3,'139184718','Fideo','5','4',1), ('444444444',1,4,'139184718','Luna','1','1',1)",
        "INSERT INTO `hora` VALUES (1,1,'10:00','2018-11-15',1), (2,1,'10:30','2018-11-20',1), (3,2,'16:00','2018-11-20',1), (4,2,'16:30','2018-11-08',1), (5,3,'20:00','2018-11-09',1), (6,3,'20:30','2018-11-09',1),(7,3,'21:00','2018-11-09',1)",
        "INSERT INTO `especialidad` VALUES (1,'General',1), (2,'Peluquería',1)",
        "INSERT INTO `especialista` VALUES (1,1,'59530534 ','Joseph','Jimenez',NULL,'joseph@vet.cl',NULL,NULL,NULL,1), (2,1,'212385255','Claudio','Igor',NULL,'claudio@vet.cl','',NULL,NULL,1), (3,2,'51428250','Daniel','Águila',NULL,'daniel@vet.cl','',NULL,NULL,1), (4,2,'10275736k','Hans','Poffald',NULL,'hans@vet.cl',NULL,NULL,NULL,1)",
        "INSERT INTO `duenomascota` VALUES ('13269946',3,'Andrés Osorio','Osorio','Osorio',1,'3 Poniente #10082','+56123413','andres.osorio@ugm.cl',1),('10773614K',5,'María José','Durán','Napolitano',2,'Vicuña Mackenna #10082 ','+56123413','cote@ugm.cl',1), ('139184718',6,'Cristian','Contreras','',2,'Pocuro 8413','+56123413','cristian@ugm.cl',1), ('173158246',4,'Graciela','Baldrich','Guerrero',2,'Pasaje Palqui #874','+56123413','graciela@ugm.cl',1)",
        "INSERT INTO `cita` VALUES (1,'111111111',1,'1',1,1), (2,'222222222',2,'2',1,1), (3,'333333333',2,'3',2,1)",
        "INSERT INTO `comuna` VALUES (1,1,'Puente Alto',1), (2,1,'La Florida',1), (3,1,'Providencia',1)",
        "INSERT INTO `bloquehorario` VALUES (1,'10:00','10:30',1), (2,'10:30','11:00',1), (3,'11:30','12:00',1)"
      ];
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