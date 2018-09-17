import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';

import { AdminModule } from './admin/admin.module';
import { RecepcionistaModule } from './recepcionista/recepcionista.module';
import { DuenoModule } from './dueno/dueno.module';

import { LocalDBService } from './../services/LocalDB.service';
import { UsuarioLocalDBService } from './../services/UsuarioLocalDB.service';

import { LibreriasModule } from './../librerias.module';


@NgModule({
  imports: [
    CommonModule,
    AdminModule,RecepcionistaModule,DuenoModule
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [ 
  ],
  providers: [
    LocalDBService,UsuarioLocalDBService
  ]
})
export class PaginasModule { }