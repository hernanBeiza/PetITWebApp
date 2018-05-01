import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascotasRoutingModule } from './mascotas.routing';

import { CompartidoModule } from './../../../compartido.module';

import { MascotasComponent } from './mascotas.component';
import { MascotasConsultarComponent } from './mascotas-consultar/mascotas-consultar.component';
import { MascotasRegistrarComponent } from './mascotas-registrar/mascotas-registrar.component';
import { MascotasModificarComponent } from './mascotas-modificar/mascotas-modificar.component';

import { DuenoLocalDBService } from './../../../services/DuenoLocalDB.service';
import { MascotaLocalDBService } from './../../../services/MascotaLocalDB.service';


@NgModule({
	imports: [
    	CommonModule,
		MascotasRoutingModule,
		CompartidoModule
	],
	declarations: [MascotasComponent, 
  		MascotasConsultarComponent, 
  		MascotasRegistrarComponent, 
  		MascotasModificarComponent
	],
	providers: [
		DuenoLocalDBService,
		MascotaLocalDBService
	]
})
export class MascotasModule { }