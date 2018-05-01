import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MascotasRegistrarComponent } from './mascotas-registrar/mascotas-registrar.component';
import { MascotasModificarComponent } from './mascotas-modificar/mascotas-modificar.component';
import { MascotasConsultarComponent } from './mascotas-consultar/mascotas-consultar.component';


const routes: Routes = [
  { path: 'registrar/:iddueno',               component: MascotasRegistrarComponent },
  { path: 'modificar/:idmascota',          component: MascotasModificarComponent },
  { path: 'consultar',                      component: MascotasConsultarComponent },
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

export const MascotasRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
