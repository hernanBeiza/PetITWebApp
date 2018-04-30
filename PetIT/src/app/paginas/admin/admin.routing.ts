import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { InformeModule } from './informe/informe.module';


const routes: Routes = [
  { path: 'admin',  component: AdminComponent,
    children: [
      { path: 'inicio',                 component: InicioComponent },
      { path: 'informe',                loadChildren: () => InformeModule },
    ],
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
export class AdminRoutingModule { }
*/

export const AdminRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);