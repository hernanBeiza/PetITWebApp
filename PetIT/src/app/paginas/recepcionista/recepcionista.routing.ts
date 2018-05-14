import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RecepcionistaComponent } from './recepcionista.component';

import { InicioComponent } from './inicio/inicio.component';

import { HorasModule } from './horas/horas.module';
import { DuenosModule } from './duenos/duenos.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';

export function loadHorasModule() {
  return HorasModule;
}
export function loadDuenosModule() {
  return DuenosModule;
}
export function loadMascotasModule() {
  return MascotasModule;
}
export function loadNotificacionesModule() {
  return NotificacionesModule;
}

const routes: Routes =[
  { 
    path: 'recepcionista',  component: RecepcionistaComponent,
      children: [
      { path: 'inicio',         component: InicioComponent },
      /*
      { path: 'horas',          loadChildren: loadHorasModule },
      { path: 'duenos',          loadChildren: loadDuenosModule },
      { path: 'mascotas',          loadChildren: loadMascotasModule },
      { path: 'notificaciones',          loadChildren: loadNotificacionesModule }, 
      */
      { path: 'horas',                loadChildren: './horas/horas.module#HorasModule' },
      { path: 'duenos',          loadChildren: './duenos/duenos.module#DuenosModule' },
      { path: 'mascotas',          loadChildren: './mascotas/mascotas.module#MascotasModule' },
      { path: 'notificaciones',          loadChildren: './notificaciones/notificaciones.module#NotificacionesModule' },
     /*
      { path: 'horas',                loadChildren: () => HorasModule },
      { path: 'duenos',          loadChildren: () => DuenosModule },
      { path: 'mascotas',          loadChildren: () => MascotasModule },
      { path: 'notificaciones',          loadChildren: () => NotificacionesModule },
      */
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

export const RecepcionistaRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
