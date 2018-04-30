import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { InformeComponent } from './informe.component';
import { InformeGenerarComponent } from './informe-generar/informe-generar.component';

const routes: Routes =[
  { path: 'informe',  component: InformeComponent },
  { path: 'generar', component: InformeGenerarComponent},
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
export class InformeRoutingModule { }
*/

export const InformeRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);