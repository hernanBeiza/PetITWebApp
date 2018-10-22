import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BloquesConsultarComponent } from './bloques-consultar/bloques-consultar.component';
import { BloquesAsignarComponent } from './bloques-asignar/bloques-asignar.component';

const routes: Routes = [
  { path: 'consultar',               component: BloquesConsultarComponent },
  { path: 'asignar/:rut',               component: BloquesAsignarComponent },
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

export const BloquesRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);