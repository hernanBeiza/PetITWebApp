import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoginComponent } from './login/login.component';

import { AdminModule } from './admin/admin.module';
import { RecepcionistaModule } from './recepcionista/recepcionista.module';
import { DuenoModule } from './dueno/dueno.module';

import { LocalDBService } from './../services/LocalDB.service';
import { UsuarioLocalDBService } from './../services/UsuarioLocalDB.service';

import { CompartidoModule } from './../compartido.module';


@NgModule({
  imports: [
    CommonModule,
    CompartidoModule,
    AdminModule,RecepcionistaModule,DuenoModule
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [ 
    CompartidoModule
  ],
  providers: [
    LocalDBService,UsuarioLocalDBService
  ]
})
export class PaginasModule { }