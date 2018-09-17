import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

//import { HorasAgendarComponent } from './horas-agendar/horas-agendar.component';
import { HorasAgendarComponent } from './../../../compartido/horas/horas-agendar/horas-agendar.component';
import { HorasConsultarComponent } from './horas-consultar/horas-consultar.component';
//import { HorasFinalizarComponent } from './horas-finalizar/horas-finalizar.component';
import { HorasFinalizarComponent } from './../../../compartido/horas/horas-finalizar/horas-finalizar.component';

const routes: Routes = [
  { path: 'agendar/:rutdueno/:rutmascota',         component: HorasAgendarComponent },
  { path: 'consultar',         component: HorasConsultarComponent },
  { path: 'finalizar/:idcita',         component: HorasFinalizarComponent },
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