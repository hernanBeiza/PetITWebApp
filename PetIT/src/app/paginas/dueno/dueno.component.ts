import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dueno',
  templateUrl: './dueno.component.html',
  styleUrls: ['./dueno.component.css']
})
export class DuenoComponent implements OnInit {

	public menu:Array<any> = new Array<any>(
		{ 
			nombre: "Inicio",link: "/dueno/inicio",icono: "home", 
			titulo: "Bienvenido al sistema Pet-IT", bajada: "Desde aquí podrás agendar horas para tu mascota",
			menu: true
		},
		{ 
			nombre: "Consultar horas",link: "/dueno/horas/consultar",icono: "calendar-range", 
			titulo: "Consultar horas", bajada: "Desde aquí podrás agendar horas para tu mascota",
			menu: true
		},
		{ 
			nombre: "Notificaciones",link: "/dueno/notificaciones/leer",icono: "send", 
			titulo: "Notificaciones", bajada: "Lee tus notificaciones",
			menu: true
		},
		{ 
			nombre: "Cerrar Sesión",link: "/login",icono: "close",
			titulo: "Salir", bajada: "Cerrar sesión",
			menu: true
		},
	);

	constructor() { }

	ngOnInit() { }

}