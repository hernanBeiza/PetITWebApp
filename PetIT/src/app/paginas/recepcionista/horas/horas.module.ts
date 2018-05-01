import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CompartidoModule } from './../../../compartido.module';

import { HorasRoutingComponent } from './horas.routing';

import { HorasComponent } from './horas.component';

import {FiltroCitasPipe} from './../../../pipes/filtroCitas.pipe';
//Horas
import { BuscarComponent } from './buscar/buscar.component';
import { AgendarComponent } from './agendar/agendar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { FinalizarComponent } from './finalizar/finalizar.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { ListaEncontradosComponent } from './lista-encontrados/lista-encontrados.component';

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
		HorasComponent, 
		BuscarComponent, AgendarComponent, ConsultarComponent, FinalizarComponent, BuscadorComponent, ListaEncontradosComponent, 
	]
})
export class HorasModule { }
