import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RecepcionistaRoutingModule } from './recepcionista.routing';

import { CompartidoModule } from './../../compartido/compartido.module';

// SubMódulos del recepcionista
import { HorasModule } from './horas/horas.module';
import { DuenosModule } from './duenos/duenos.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { EspecialistasModule } from './especialistas/especialistas.module';

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
import { ComunaLocalDBService } from './../../services/ComunaLocalDB.service';

import { DuenosConsultarComponent } from './duenos/duenos-consultar/duenos-consultar.component';

@NgModule({
	imports: [
	    CommonModule,
	    CompartidoModule,
	    RecepcionistaRoutingModule,
		HorasModule, DuenosModule, MascotasModule, NotificacionesModule, EspecialistasModule
	],
	exports: [
		RouterModule,CompartidoModule
	],
	providers: [
		RazaLocalDBService,TipoMascotaLocalDBService,DuenoMascotaLocalDBService,EspecialidadLocalDBService,CitaLocalDBService,
		EspecialistaLocalDBService,
		ComunaLocalDBService
	],
	declarations: [
		RecepcionistaComponent,
		InicioComponent
	]
})
export class RecepcionistaModule { }