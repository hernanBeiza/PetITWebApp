import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
//import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { InformeComponent } from './informe.component';
import { InformeGenerarComponent } from './informe-generar/informe-generar.component';

const routes: Routes =[
  { path: '',  component: InformeComponent,
      children: [
      { path: 'generar',         component: InformeGenerarComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    //BrowserModule,
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



export const routing = RouterModule.forChild(routes);