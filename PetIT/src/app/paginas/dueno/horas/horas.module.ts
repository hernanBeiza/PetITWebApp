import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CompartidoModule } from './../../../compartido.module';

import { HorasRoutingComponent } from './horas.routing';

//Horas
import { HorasAgendarComponent } from './horas-agendar/horas-agendar.component';
import { HorasConsultarComponent } from './horas-consultar/horas-consultar.component';
import { HorasFinalizarComponent } from './horas-finalizar/horas-finalizar.component';

@NgModule({
	imports: [
		CommonModule,
	    RouterModule,
		CompartidoModule,
		HorasRoutingComponent
	],
	exports: [
		CompartidoModule,
		RouterModule
	],
	declarations: [
		HorasAgendarComponent, HorasConsultarComponent, HorasFinalizarComponent
	]
})
export class HorasModule { }
