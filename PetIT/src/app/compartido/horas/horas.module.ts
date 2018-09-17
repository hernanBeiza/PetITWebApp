import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LibreriasModule } from './../../librerias.module';

//import { HorasRoutingComponent } from './horas.routing';

//Mascotas
import { HorasAgendarComponent } from './horas-agendar/horas-agendar.component';
import { HorasFinalizarComponent } from './horas-finalizar/horas-finalizar.component';

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
		//ListarMascotasComponent
		HorasAgendarComponent,
		HorasFinalizarComponent
	],
	declarations: [
		HorasAgendarComponent,
		HorasFinalizarComponent
	]
})
export class HorasModule { }
