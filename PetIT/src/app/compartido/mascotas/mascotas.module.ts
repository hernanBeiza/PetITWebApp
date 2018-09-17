import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LibreriasModule } from './../../librerias.module';

//import { HorasRoutingComponent } from './horas.routing';

//Mascotas
import { MascotasListarComponent } from './mascotas-listar/mascotas-listar.component';
//import { HorasConsultarComponent } from './horas-consultar/horas-consultar.component';
//import { HorasFinalizarComponent } from './horas-finalizar/horas-finalizar.component';

@NgModule({
	imports: [
		CommonModule,
	    RouterModule,
		LibreriasModule,
		//HorasRoutingComponent
	],
	exports: [
		LibreriasModule,
		RouterModule,
		MascotasListarComponent
	],
	declarations: [
		MascotasListarComponent
	]
})
export class MascotasModule { }
