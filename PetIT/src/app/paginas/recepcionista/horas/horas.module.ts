import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CompartidoModule } from './../../../compartido.module';

import { HorasRoutingComponent } from './horas.routing';

import { FiltroCitasPipe } from './../../../pipes/filtroCitas.pipe';
//Horas
import { AgendarComponent } from './agendar/agendar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { FinalizarComponent } from './finalizar/finalizar.component';

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
	    FiltroCitasPipe,
		AgendarComponent, ConsultarComponent, FinalizarComponent
	]
})
export class HorasModule { }
