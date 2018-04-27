import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


import { AdminComponent } from './admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { InformeGenerarComponent } from './informe/informe-generar/informe-generar.component';

const routes: Routes =[
  { path: 'admin',  component: AdminComponent,
      children: [
      { path: 'inicio',                 component: InicioComponent },
      { path: 'informe/generar',         component: InformeGenerarComponent },
    ]
  }
];

/*
const routes: Routes =[
  { path: '',  component: AdminComponent },
  { path: 'inicio',component: InicioComponent },
];
*/

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
export class AdminRoutingModule { }

