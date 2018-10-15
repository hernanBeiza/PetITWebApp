import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { PaginasModule } from './paginas/paginas.module';
import { LibreriasModule } from './librerias.module';

import { LocalDBService } from './services/LocalDB.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpModule,
    AppRoutingModule,
    PaginasModule,
    LibreriasModule
  ],
  providers: [LocalDBService],
  bootstrap: [AppComponent]
})
export class AppModule { }