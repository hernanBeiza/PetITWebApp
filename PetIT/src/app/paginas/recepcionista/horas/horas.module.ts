import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MzRadioButtonModule, MzInputModule, MzButtonModule, MzDropdownModule } from 'ng2-materialize';

import { HorasComponent } from './horas.component';

import { CabeceraComponent } from './../../cabecera/cabecera.component';

import { BuscadorComponent } from './buscador/buscador.component';
import { AgendarComponent } from './agendar/agendar.component';
import { BuscarComponent } from './buscar/buscar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { FinalizarComponent } from './finalizar/finalizar.component';

import { ListaEncontradosComponent } from './lista-encontrados/lista-encontrados.component'

@NgModule({
  imports: [
    CommonModule,
    MzRadioButtonModule,MzInputModule,MzButtonModule,MzDropdownModule
  ],
  declarations: [
  CabeceraComponent, 
  HorasComponent, BuscadorComponent, 
  AgendarComponent, BuscarComponent, ConsultarComponent, FinalizarComponent, 
  ListaEncontradosComponent]
})
export class HorasModule { }
