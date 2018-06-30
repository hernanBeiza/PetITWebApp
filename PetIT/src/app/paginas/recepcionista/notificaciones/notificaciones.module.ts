import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompartidoModule } from './../../../compartido.module';

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
	  EnviarComponent
  ]
})
export class NotificacionesModule { }
