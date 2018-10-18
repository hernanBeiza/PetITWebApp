import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascotasRoutingModule } from './mascotas.routing';

import { LibreriasModule } from './../../../librerias.module';

import { CompartidoModule } from './../../../compartido/compartido.module';


import { MascotasConsultarComponent } from './mascotas-consultar/mascotas-consultar.component';
import { MascotasAgregarComponent } from './mascotas-agregar/mascotas-agregar.component';
import { MascotasModificarComponent } from './mascotas-modificar/mascotas-modificar.component';

import { DuenoMascotaLocalDBService } from './../../../services/DuenoMascotaLocalDB.service';
import { MascotaLocalDBService } from './../../../services/MascotaLocalDB.service';

@NgModule({
	imports: [
    	CommonModule,CompartidoModule,
		MascotasRoutingModule,
		LibreriasModule
	],
	declarations: [
  		MascotasConsultarComponent, 
  		MascotasAgregarComponent, 
  		MascotasModificarComponent
	],
	providers: [
		DuenoMascotaLocalDBService,
		MascotaLocalDBService
	]
})
export class MascotasModule { }