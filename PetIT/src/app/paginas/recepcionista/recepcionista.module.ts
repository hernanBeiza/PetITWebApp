import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CompartidoModule } from './../../compartido.module';

import { RecepcionistaRoutingModule } from './recepcionista.routing';

// SubMódulos del recepcionista
import { HorasModule } from './horas/horas.module';
import { DuenosModule } from './duenos/duenos.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';

// Componentes del recepcionista
import { RecepcionistaComponent } from './recepcionista.component';
import { InicioComponent } from './inicio/inicio.component';

// Services
import { RazaLocalDBService } from './../../services/RazaLocalDB.service';
import { TipoMascotaLocalDBService } from './../../services/TipoMascotaLocalDB.service';
import { DuenoMascotaLocalDBService } from './../../services/DuenoMascotaLocalDB.service';
import { CitaLocalDBService } from './../../services/CitaLocalDB.service';
import { EspecialidadLocalDBService } from './../../services/EspecialidadLocalDB.service';
import { EspecialistaLocalDBService } from './../../services/EspecialistaLocalDB.service';
import { HoraLocalDBService } from './../../services/HoraLocalDB.service';

import { DuenosConsultarComponent } from './duenos/duenos-consultar/duenos-consultar.component';

@NgModule({
	imports: [
	    CommonModule,
	    RecepcionistaRoutingModule,
		CompartidoModule,
		HorasModule, DuenosModule, MascotasModule, NotificacionesModule,
	],
	exports: [
		RouterModule
	],
	providers: [
		RazaLocalDBService,TipoMascotaLocalDBService,DuenoMascotaLocalDBService,EspecialidadLocalDBService,CitaLocalDBService,
		EspecialistaLocalDBService,
		HoraLocalDBService,
	],
	declarations: [
		RecepcionistaComponent,
		InicioComponent
	]
})
export class RecepcionistaModule { }