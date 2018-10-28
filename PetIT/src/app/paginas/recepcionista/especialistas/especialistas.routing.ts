import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EspecialistasComponent } from './especialistas.component';

import { BloquesModule } from './bloques/bloques.module';

export function loadBloquesModule() {
  return BloquesModule;
}
//Choca con el / del index
/*
const routes: Routes = [
  {
    path: '',  component: EspecialistasComponent,
    children: [
      { path: 'bloques',             loadChildren: loadBloquesModule },
      //{ path: 'bloques',           loadChildren: './bloques/bloques.module#BloquesModule'  },
    ]
  }
];
*/
const routes: Routes = [
  {
    path: 'bloques',  loadChildren: loadBloquesModule
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

export const EspecialistasRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);