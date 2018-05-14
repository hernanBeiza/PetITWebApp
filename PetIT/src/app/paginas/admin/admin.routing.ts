import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { InformeModule } from './informe/informe.module';


// Do not delete. Used to ensure ProfileModule is loaded in the same bundle.
// Referencing the function directly in `loadChildren` breaks AoT compiler.
export function loadInformeModule() {
    return InformeModule;
}

const routes: Routes = [
  { path: 'admin',  component: AdminComponent,
    children: [
      { path: 'inicio',                 component: InicioComponent },
      //{ path: 'informe',                loadChildren: loadInformeModule },
      { path: 'informe',                loadChildren: './informe/informe.module#InformeModule' },
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