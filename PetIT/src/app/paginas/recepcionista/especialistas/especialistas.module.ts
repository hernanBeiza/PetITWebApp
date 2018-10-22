import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BloquesModule} from './bloques/bloques.module';

import { EspecialistasRoutingModule } from './especialistas.routing';
import { EspecialistasComponent } from './especialistas.component';

import { LibreriasModule } from './../../../librerias.module';
import { CompartidoModule } from './../../../compartido/compartido.module';


import { EspecialistaDisponibilidadLocalDBService } from './../../../services/EspecialistaDisponibilidadLocalDB.service';

@NgModule({
	imports: [
		CommonModule,
		LibreriasModule, CompartidoModule,
		EspecialistasRoutingModule,
		BloquesModule
	],
	exports: [
		LibreriasModule, CompartidoModule,
		RouterModule
	],
	providers: [
		EspecialistaDisponibilidadLocalDBService
	],
	declarations: [
		EspecialistasComponent
	]
})
export class EspecialistasModule { }