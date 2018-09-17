import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibreriasModule } from './../../../librerias.module';

import { NotificacionesRoutingModule } from './notificaciones.routing';

import { LeerComponent } from './leer/leer.component';

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
  	LeerComponent
  ]
})
export class NotificacionesModule { }
