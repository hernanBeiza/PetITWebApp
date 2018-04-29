import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompartidoModule } from './../../../compartido.module';

import { HorasComponent } from './horas.component';


//Horas
import { BuscarComponent } from './buscar/buscar.component';
import { AgendarComponent } from './agendar/agendar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { FinalizarComponent } from './finalizar/finalizar.component';

@NgModule({
	imports: [
		CommonModule,
		CompartidoModule
	],
	exports: [
		CompartidoModule
	],
	declarations: [
		HorasComponent, 
		BuscarComponent, AgendarComponent, ConsultarComponent, FinalizarComponent, 
	]
})
export class HorasModule { }
