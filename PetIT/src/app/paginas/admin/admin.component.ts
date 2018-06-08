import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	public menu:Array<any> = new Array<any>(
		{ nombre: "Inicio",link: "/admin/inicio",icono: "home", titulo: "Bienvenido al sistema Pet-IT", bajada: "Desde aquí podrás revisar las estadísticas de tu clínica veterinaria" },
		{ nombre: "Informes",link: "",icono: "show_charts", 
			subsecciones: 
			[
				{ nombre: "Ver", link: "/admin/informe/generar", icono: "insert_chart", titulo: "Reportes", bajada: "Genera tu reporte desde aquí" }
			]
		},
		{ nombre: "Cerrar Sesión", link:"/login", icono:"close" }
	);

	constructor() { 
		//console.log("AdminComponent();");
	}

	ngOnInit() {
		//console.log("AdminComponent: ngOnInit();");
	}

	ngOnDestroy() {
		//console.info("AdminComponent: ngOnDestroy();");
	}

}