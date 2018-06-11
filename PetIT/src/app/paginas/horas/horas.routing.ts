import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


import { BuscarComponent } from './buscar/buscar.component';
import { AgendarComponent } from './agendar/agendar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { FinalizarComponent } from './finalizar/finalizar.component';

const routes: Routes = [
  { path: 'buscar',         component: BuscarComponent },
  { path: 'agendar/:rutdueno/:rutmascota',         component: AgendarComponent },
  { path: 'consultar',         component: ConsultarComponent },
  { path: 'finalizar/:idcita',         component: FinalizarComponent },
];

/*
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [
    RouterModule
  ],
})
export class HorasRoutingComponent { }
*/

export const HorasRoutingComponent: ModuleWithProviders = RouterModule.forChild(routes);