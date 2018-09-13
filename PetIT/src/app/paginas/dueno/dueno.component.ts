import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dueno',
  templateUrl: './dueno.component.html',
  styleUrls: ['./dueno.component.css']
})
export class DuenoComponent implements OnInit {

	public menu:Array<any> = new Array<any>(
		{ nombre: "Inicio",link: "/dueno/inicio",icono: "home", titulo: "Inicio", bajada: "Bienvenido al sistema Pet-IT" },
		{ nombre: "Consultar horas",link: "/dueno/horas/consultar",icono: "calendar-range", titulo: "Horas", bajada: "Consulta horas"},
		{ nombre: "Notificaciones",link: "/dueno/notificaciones/leer",icono: "send", titulo: "Notificaciones", bajada: "Envía notificaciones"},
		{ nombre: "Cerrar Sesión",link: "/login",icono: "close",titulo: "Salir", bajada: "Cerrar sesión"},
	);

	constructor() { }

	ngOnInit() { }

}