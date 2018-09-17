import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibreriasModule } from './../../../librerias.module';

import { NotificacionesRoutingModule } from './notificaciones.routing';

import { EnviarComponent } from './enviar/enviar.component';

@NgModule({
  imports: [
    CommonModule,
    LibreriasModule,
    NotificacionesRoutingModule
  ],
  exports: [
	  LibreriasModule
  ],
  declarations: [
	  EnviarComponent
  ]
})
export class NotificacionesModule { }
