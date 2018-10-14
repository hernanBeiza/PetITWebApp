import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recepcionista',
  templateUrl: './recepcionista.component.html',
  styleUrls: ['./recepcionista.component.css']
})
export class RecepcionistaComponent implements OnInit {

	public menu:Array<any> = new Array<any>(
		{ nombre: "Inicio",link: "/recepcionista/inicio",icono: "home", titulo: "Inicio", bajada: "Bienvenido al sistema Pet-IT. Desde aquí podrá gestionar su veterinaria" },
		{ nombre: "Gestionar dueños",link: "/recepcionista/duenos/consultar",icono: "account", titulo: "Gestionar Dueños", bajada: "Gestiona los dueños"},
		{ nombre: "Cupos de atención",link: "/recepcionista/especialistas/asignar",icono: "clock", titulo: "Cupos de Atención", bajada: "Gestiona los horarios de los veterinarios"},
		{ nombre: "Gestionar mascotas",link: "/recepcionista/mascotas/consultar",icono: "paw", titulo: "Gestionar Mascotas", bajada: "Gestiona las mascotas"},
		{ nombre: "Consultar horas",link: "/recepcionista/horas/consultar",icono: "calendar-range", titulo: "Consultar Horas", bajada: "Consulta horas"},
		{ nombre: "Notificaciones",link: "/recepcionista/notificaciones/enviar",icono: "send", titulo: "Notificaciones", bajada: "Envía notificaciones a los dueños de mascota"},
		{ nombre: "Cerrar Sesión",link: "/login",icono: "close",titulo: "Salir", bajada: "Cerrar sesión"},
	);

	constructor() { }

	ngOnInit() { }

}