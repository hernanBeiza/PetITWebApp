import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesComponent } from './notificaciones.component';
import { EnviarComponent } from './enviar/enviar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NotificacionesComponent, EnviarComponent]
})
export class NotificacionesModule { }
