import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EspecialistasRoutingModule } from './especialistas.routing';
import { LibreriasModule } from './../../../librerias.module';
import { CompartidoModule } from './../../../compartido/compartido.module';

import { EspecialistasAsignarComponent } from './especialistas-asignar/especialistas-asignar.component';
import { EspecialistasBloqueComponent } from './especialistas-bloque/especialistas-bloque.component';

import { EspecialistaDisponibilidadLocalDBService } from './../../../services/EspecialistaDisponibilidadLocalDB.service';
import { BloqueHorarioLocalDBService } from './../../../services/BloqueHorarioLocalDB.service';

@NgModule({
	imports: [
		CommonModule,
		EspecialistasRoutingModule,
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
		EspecialistasAsignarComponent,EspecialistasBloqueComponent
	]
})
export class EspecialistasModule { }
