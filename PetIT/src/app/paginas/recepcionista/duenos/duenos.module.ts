import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DuenosRoutingModule } from './duenos.routing';
import { LibreriasModule } from './../../../librerias.module';

import { DuenosConsultarComponent } from './duenos-consultar/duenos-consultar.component';
import { DuenosAgregarComponent } from './duenos-agregar/duenos-agregar.component';
import { DuenosModificarComponent } from './duenos-modificar/duenos-modificar.component';

@NgModule({
	imports: [
		CommonModule,
		DuenosRoutingModule,
		LibreriasModule
	],
	exports: [
		RouterModule,
	],
	declarations: [
		DuenosConsultarComponent, 
		DuenosAgregarComponent, 
		DuenosModificarComponent
	]
})
export class DuenosModule { }
