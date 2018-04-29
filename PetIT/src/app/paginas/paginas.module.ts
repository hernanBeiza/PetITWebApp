import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabeceraComponent } from './cabecera/cabecera.component';
import { LoginComponent } from './login/login.component';

import { AdminModule } from './admin/admin.module';
import { RecepcionistaModule } from './recepcionista/recepcionista.module';

import { LocalDBService } from './../services/LocalDB.service';
import { UsuarioService } from './../services/Usuario.service';

import { Ng2Rut, RutValidator } from 'ng2-rut';

import { CompartidoModule } from './../compartido.module';


@NgModule({
  imports: [
    CommonModule,
    Ng2Rut,
    CompartidoModule,
    AdminModule,RecepcionistaModule
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
    RutValidator,
    LocalDBService,UsuarioService
  ]
})
export class PaginasModule { }