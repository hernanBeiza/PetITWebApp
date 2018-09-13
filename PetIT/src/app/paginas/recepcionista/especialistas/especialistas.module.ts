import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EspecialistasRoutingModule } from './especialistas.routing';
import { CompartidoModule } from './../../../compartido.module';

import { EspecialistasAsignarComponent } from './especialistas-asignar/especialistas-asignar.component';

@NgModule({
	imports: [
		CommonModule,
		EspecialistasRoutingModule,
		CompartidoModule
	],
	exports: [
		CompartidoModule,
		RouterModule
	],
	declarations: [
		EspecialistasAsignarComponent
	]
})
export class EspecialistasModule { }
