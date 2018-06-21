import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DuenoComponent } from './dueno.component';
import { InicioComponent } from './inicio/inicio.component';
import { NotificacionesModule } from './notificaciones/notificaciones.module';

export function loadNotificacionesModule() {
  return NotificacionesModule;
}

const routes: Routes = [
  { 
    path: 'dueno',  component: DuenoComponent,
    children: [
      { path: 'inicio',            component: InicioComponent },
      { path: 'notificaciones',    loadChildren: loadNotificacionesModule },
      //{ path: 'horas',                loadChildren: () => HorasModule },
    ]
  }
];

/*
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [
    RouterModule
  ],
})
export class RecepcionistaRoutingModule { }
*/

export const DuenoRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);