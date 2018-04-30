import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { LoginComponent } from './paginas/login/login.component';

import { AdminModule } from './paginas/admin/admin.module';
import { RecepcionistaModule } from './paginas/recepcionista/recepcionista.module';

import { LocalDBService } from './services/LocalDB.service';
import { UsuarioService } from './services/Usuario.service';

import { Ng2Rut, RutValidator } from 'ng2-rut';

import { CompartidoModule } from './compartido.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpModule,
    CompartidoModule, Ng2Rut,
    AppRoutingModule,
    AdminModule,
    RecepcionistaModule,
  ],
  providers: [LocalDBService,UsuarioService,RutValidator],
  bootstrap: [AppComponent]
})
export class AppModule { }