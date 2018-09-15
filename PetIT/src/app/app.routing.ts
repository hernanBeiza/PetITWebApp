import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './paginas/login/login.component';

const routes: Routes = [
  { path: 'login',              component: LoginComponent },
  { path: '',                   redirectTo: 'login', pathMatch: 'full' }
  // { path: '**',        component: NotFoundComponent },
];
/*
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
*/
//export class AppRoutingModule { }
export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes,{ useHash: true });