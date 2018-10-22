import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BloquesRoutingModule } from './bloques.routing';
import { LibreriasModule } from './../../../../librerias.module';
import { CompartidoModule } from './../../../../compartido/compartido.module';

import { BloquesConsultarComponent } from './bloques-consultar/bloques-consultar.component';
import { BloquesAsignarComponent } from './bloques-asignar/bloques-asignar.component';

import { EspecialistaDisponibilidadLocalDBService } from './../../../../services/EspecialistaDisponibilidadLocalDB.service';
import { BloqueHorarioLocalDBService } from './../../../../services/BloqueHorarioLocalDB.service';

@NgModule({
	imports: [
		CommonModule,
		BloquesRoutingModule,
		LibreriasModule, CompartidoModule
	],
	exports: [
		LibreriasModule, CompartidoModule,
		RouterModule
	],
	providers: [
		EspecialistaDisponibilidadLocalDBService,
		BloqueHorarioLocalDBService
	],
	declarations: [
		BloquesConsultarComponent,
		BloquesAsignarComponent
	]
})
export class BloquesModule { }
