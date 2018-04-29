import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './paginas/admin/admin.component';
import { RecepcionistaComponent } from './paginas/recepcionista/recepcionista.component';
import { LoginComponent } from './paginas/login/login.component';


const routes: Routes =[
      { path: 'admin',              component: AdminComponent },
      { path: 'recepcionista',      component: RecepcionistaComponent },
      { path: 'login',              component: LoginComponent },
      { path: '',                   redirectTo: 'login', pathMatch: 'full' }
      // { path: '**',        component: NotFoundComponent },
];

/*
const routes: Routes =[
      { path: 'admin', loadChildren: 'app/paginas/admin/admin.module#AdminModule'},
      { path: 'login',     component: LoginComponent },
      { path: '',          redirectTo: 'login', pathMatch: 'full' }
      // { path: '**',        component: NotFoundComponent },
];
*/
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }