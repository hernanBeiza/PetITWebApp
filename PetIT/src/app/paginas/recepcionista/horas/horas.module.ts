import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CompartidoModule } from './../../../compartido/compartido.module';
import { LibreriasModule } from './../../../librerias.module';

import { HorasRoutingComponent } from './horas.routing';

//Horas
import { HorasConsultarComponent } from './horas-consultar/horas-consultar.component';

@NgModule({
	imports: [
		CommonModule,
	    RouterModule,
		CompartidoModule,LibreriasModule,
		HorasRoutingComponent
	],
	exports: [
		CompartidoModule,
		RouterModule
	],
	declarations: [
		HorasConsultarComponent
	]
})
export class HorasModule { }
