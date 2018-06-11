import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DuenosAgregarComponent } from './duenos-agregar/duenos-agregar.component';
import { DuenosConsultarComponent } from './duenos-consultar/duenos-consultar.component';
import { DuenosModificarComponent } from './duenos-modificar/duenos-modificar.component';


const routes: Routes = [
  { path: 'agregar',               component: DuenosAgregarComponent },
  { path: 'modificar/:rutdueno',    component: DuenosModificarComponent },
  { path: 'consultar',             component: DuenosConsultarComponent },
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

export const DuenosRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);