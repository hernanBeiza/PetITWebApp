import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


import { EnviarComponent } from './enviar/enviar.component';

const routes: Routes =[
  { 
    path: 'enviar',  component: EnviarComponent,
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

export const NotificacionesRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
