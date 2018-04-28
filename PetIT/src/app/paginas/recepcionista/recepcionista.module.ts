import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MzRadioButtonModule, MzInputModule, MzButtonModule, MzSelectModule } from 'ng2-materialize';

import { RecepcionistaRoutingModule } from './recepcionista.routing';

import { RecepcionistaComponent } from './recepcionista.component';

import { InicioComponent } from './inicio/inicio.component';

// Módulos Compartidos
import { BuscadorComponent } from './horas/buscador/buscador.component';
import { ListaEncontradosComponent } from './horas/lista-encontrados/lista-encontrados.component';
import { CabeceraComponent } from './../cabecera/cabecera.component';


// Services
import { DuenoLocalDBService } from './../../services/DuenoLocalDB.service';
import { CitaLocalDBService } from './../../services/CitaLocalDB.service';
import { EspecialidadLocalDBService } from './../../services/EspecialidadLocalDB.service';
import { EspecialistaLocalDBService } from './../../services/EspecialistaLocalDB.service';
import { FechaLocalDBService } from './../../services/FechaLocalDB.service';
import { HoraLocalDBService } from './../../services/HoraLocalDB.service';

//Horas
import { BuscarComponent } from './horas/buscar/buscar.component';
import { AgendarComponent } from './horas/agendar/agendar.component';
import { ConsultarComponent } from './horas/consultar/consultar.component';
import { FinalizarComponent } from './horas/finalizar/finalizar.component';

//Notificaciones
import { EnviarComponent } from './notificaciones/enviar/enviar.component';


import { MenuComponent } from './menu/menu.component';

import { CompartidoModule } from './../../compartido.module';

@NgModule({
	imports: [
	    CommonModule,
	    FormsModule,
	    RecepcionistaRoutingModule,
		CompartidoModule,
		MzRadioButtonModule, MzInputModule, MzButtonModule, MzSelectModule
	],
	providers: [
		DuenoLocalDBService,EspecialidadLocalDBService,CitaLocalDBService,
		EspecialistaLocalDBService,FechaLocalDBService,
		HoraLocalDBService
	],
	declarations: [
		RecepcionistaComponent, 
		BuscadorComponent,ListaEncontradosComponent,CabeceraComponent,
		MenuComponent,InicioComponent, 
		BuscarComponent, AgendarComponent, ConsultarComponent, FinalizarComponent, 
		EnviarComponent
	]
})
export class RecepcionistaModule { }