import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EspecialistasRoutingModule } from './especialistas.routing';
import { LibreriasModule } from './../../../librerias.module';
import { CompartidoModule } from './../../../compartido/compartido.module';

import { EspecialistasAsignarComponent } from './especialistas-asignar/especialistas-asignar.component';

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
	declarations: [
		EspecialistasAsignarComponent
	]
})
export class EspecialistasModule { }
