import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminModule } from './admin/admin.module';
import { RecepcionistaModule } from './recepcionista/recepcionista.module';

import { LoginComponent } from './login/login.component';

import { LocalDBService } from './../services/LocalDB.service';
import { UsuarioService } from './../services/Usuario.service';

import { Ng2Rut, RutValidator } from 'ng2-rut';

import { CompartidoModule } from './../compartido.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Rut,
    CompartidoModule,
    AdminModule,RecepcionistaModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    RutValidator,
    LocalDBService,UsuarioService
  ]
})
export class PaginasModule { }