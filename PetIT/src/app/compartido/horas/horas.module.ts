import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LibreriasModule } from './../../librerias.module';

import { SharedUIModule } from './../../sharedui/sharedui.module';

//Horas
import { HorasAgendarComponent } from './horas-agendar/horas-agendar.component';
import { HorasModificarComponent } from './horas-modificar/horas-modificar.component';
import { HorasFinalizarComponent } from './horas-finalizar/horas-finalizar.component';
import { HorasListarComponent } from './horas-listar/horas-listar.component';

@NgModule({
	imports: [
		CommonModule,
	    RouterModule,
		LibreriasModule,
		SharedUIModule,
	],
	exports: [
		SharedUIModule,
		LibreriasModule,
		RouterModule,
		HorasAgendarComponent,
		HorasModificarComponent,
		HorasListarComponent,
		HorasFinalizarComponent
	],
	declarations: [
		HorasAgendarComponent,
		HorasModificarComponent,
		HorasListarComponent,
		HorasFinalizarComponent
	]
})
export class HorasModule { }
