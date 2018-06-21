import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompartidoModule } from './../../../compartido.module';

import { NotificacionesRoutingModule } from './notificaciones.routing';

import { LeerComponent } from './leer/leer.component';

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
  	LeerComponent
  ]
})
export class NotificacionesModule { }
