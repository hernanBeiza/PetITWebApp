import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EspecialistasAsignarComponent } from './especialistas-asignar/especialistas-asignar.component';
import { EspecialistasBloqueComponent } from './especialistas-bloque/especialistas-bloque.component';


const routes: Routes = [
  { path: 'asignar',               component: EspecialistasAsignarComponent },
  { path: 'bloque',               component: EspecialistasBloqueComponent },
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

export const EspecialistasRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);