import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	public menu:Array<any> = new Array<any>(
		{ nombre: "Inicio",link: "/admin/inicio",icono: "home", titulo: "Inicio", bajada: "Desde aquí podrás revisar las estadísticas de tu clínica veterinaria" },
		{ nombre: "Generar Informe",link: "/admin/informe/generar",icono: "chart-bar", titulo: "Reportes", bajada: "Genera tu reporte desde aquí"},
		{ nombre: "Cerrar Sesión",link: "/login",icono: "close",titulo: "Salir", bajada: "Cerrar sesión"},
	);

	constructor() { }

	ngOnInit() {
		//console.log("AdminComponent: ngOnInit();");
	}

	ngOnDestroy() {
		//console.info("AdminComponent: ngOnDestroy();");
	}

}