import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompartidoModule } from './../../compartido.module';

import { RecepcionistaRoutingModule } from './recepcionista.routing';

// SubMódulos del recepcionista
import { HorasModule } from './horas/horas.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';

// Componentes del recepcionista
import { MenuComponent } from './menu/menu.component';
import { RecepcionistaComponent } from './recepcionista.component';
import { InicioComponent } from './inicio/inicio.component';




// Services
import { DuenoLocalDBService } from './../../services/DuenoLocalDB.service';
import { CitaLocalDBService } from './../../services/CitaLocalDB.service';
import { EspecialidadLocalDBService } from './../../services/EspecialidadLocalDB.service';
import { EspecialistaLocalDBService } from './../../services/EspecialistaLocalDB.service';
import { FechaLocalDBService } from './../../services/FechaLocalDB.service';
import { HoraLocalDBService } from './../../services/HoraLocalDB.service';






@NgModule({
	imports: [
	    CommonModule,
	    RecepcionistaRoutingModule,
		CompartidoModule,
		HorasModule, NotificacionesModule
	],
	providers: [
		DuenoLocalDBService,EspecialidadLocalDBService,CitaLocalDBService,
		EspecialistaLocalDBService,FechaLocalDBService,
		HoraLocalDBService
	],
	declarations: [
		RecepcionistaComponent, 
		MenuComponent,InicioComponent
	]
})
export class RecepcionistaModule { }