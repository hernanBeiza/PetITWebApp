import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompartidoModule } from './../../../compartido.module';

import { NotificacionesComponent } from './notificaciones.component';
import { NotificacionesRoutingModule } from './notificaciones.routing';

import { EnviarComponent } from './enviar/enviar.component';

@NgModule({
  imports: [
    CommonModule,
    CompartidoModule,
    NotificacionesRoutingModule
  ],
  exports: [
	  CompartidoModule
  ],
  declarations: [
  	NotificacionesComponent,
	  EnviarComponent
  ]
})
export class NotificacionesModule { }
