import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabeceraComponent } from './cabecera/cabecera.component';
import { LoginComponent } from './login/login.component';

import { AdminModule } from './admin/admin.module';
import { RecepcionistaModule } from './recepcionista/recepcionista.module';
import { DuenoModule } from './dueno/dueno.module';

import { LocalDBService } from './../services/LocalDB.service';
import { UsuarioService } from './../services/Usuario.service';


import { CompartidoModule } from './../compartido.module';


@NgModule({
  imports: [
    CommonModule,
    CompartidoModule,
    AdminModule,RecepcionistaModule,DuenoModule
  ],
  declarations: [
    LoginComponent,
    CabeceraComponent
  ],
  exports: [ 
    CabeceraComponent,
    CompartidoModule
  ],
  providers: [
    LocalDBService,UsuarioService
  ]
})
export class PaginasModule { }