import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascotasRoutingModule } from './mascotas.routing';

import { CompartidoModule } from './../../../compartido.module';

import { MascotasConsultarComponent } from './mascotas-consultar/mascotas-consultar.component';
import { MascotasRegistrarComponent } from './mascotas-registrar/mascotas-registrar.component';
import { MascotasModificarComponent } from './mascotas-modificar/mascotas-modificar.component';

import { DuenoMascotaLocalDBService } from './../../../services/DuenoMascotaLocalDB.service';
import { MascotaLocalDBService } from './../../../services/MascotaLocalDB.service';


@NgModule({
	imports: [
    	CommonModule,
		MascotasRoutingModule,
		CompartidoModule
	],
	declarations: [
  		MascotasConsultarComponent, 
  		MascotasRegistrarComponent, 
  		MascotasModificarComponent
	],
	providers: [
		DuenoMascotaLocalDBService,
		MascotaLocalDBService
	]
})
export class MascotasModule { }