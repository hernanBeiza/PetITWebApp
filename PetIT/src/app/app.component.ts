import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
	constructor(public location: Location, public router: Router) {}

	ngOnInit() {
	  	/*
	    if (this.location.path() =='' || this.location.path() == '/home') {
	      this.router.navigate(['/home/dashboard']);
	    }
	    */
	    const db: Database = window.openDatabase('petiddb', '1.0', 'petiddb', 2 * 1024 * 1024);
	    if(!db){
	        console.log('Failed to connect to database.');
	    } else {
		    db.transaction(function (tx) {
		    	var sql = "CREATE TABLE `usuariorol` ( 'idusuariorol' INTEGER PRIMARY KEY AUTOINCREMENT, 'rol' TEXT NOT NULL);";
		    	sql += "INSERT INTO `usuariorol` VALUES (1,'Dueño Veterinaria'); INSERT INTO `usuariorol` VALUES (2,'Recepcionista'); INSERT INTO `usuariorol` VALUES (3,'Dueño Mascota');"; 
		    	console.log(sql);
		        tx.executeSql(sql,[],onSuccessExecuteSql,onError);
		        var sql2 = "CREATE TABLE 'usuario' (	`idusuario`	INTEGER PRIMARY KEY AUTOINCREMENT,	`idrol`	INTEGER NOT NULL,	`rut`	TEXT NOT NULL UNIQUE,	`contrasena`	TEXT NOT NULL,	`nombre`	TEXT NOT NULL);";
		        console.log(sql2);
		        tx.executeSql(sql2,[],onSuccessExecuteSql,onError);
	    	}, onError, onReadyTransaction);	    	
	    }

	    function onReadyTransaction( ){
			console.log( 'Transaction completed' )
		}
		function onSuccessExecuteSql( tx, results ){
			console.log( 'Execute SQL completed' )
		}
		function onError( err ){
			console.log( err )
		}


    }

}
