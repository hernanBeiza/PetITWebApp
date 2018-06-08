import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoginComponent } from './login/login.component';

import { HiperMenuComponent } from './hipermenu/hipermenu.component';

import { AdminModule } from './admin/admin.module';
import { RecepcionistaModule } from './recepcionista/recepcionista.module';
import { DuenoModule } from './dueno/dueno.module';

import { HorasModule } from './horas/horas.module';

import { LocalDBService } from './../services/LocalDB.service';
import { UsuarioService } from './../services/Usuario.service';
import { HiperMenuService } from './../services/HiperMenu.service';

import { CompartidoModule } from './../compartido.module';


@NgModule({
  imports: [
    CommonModule,
    CompartidoModule,
    AdminModule,RecepcionistaModule,DuenoModule,HorasModule
  ],
  declarations: [
    LoginComponent,
    HiperMenuComponent
  ],
  exports: [ 
    CompartidoModule
  ],
  providers: [
    LocalDBService,UsuarioService,HiperMenuService
  ]
})
export class PaginasModule { }