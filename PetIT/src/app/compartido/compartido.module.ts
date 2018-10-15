import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modulos Compartidos 
import { LibreriasModule } from './../librerias.module';
import { HorasModule } from './horas/horas.module';
import { MascotasModule } from './mascotas/mascotas.module';


// Pipes, filtro
import { FiltroPipe } from './../pipes/filtro.pipe';
import { FiltroCitasPipe } from './../pipes/filtroCitas.pipe';


@NgModule({
  declarations: [
    FiltroPipe,FiltroCitasPipe,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, RouterModule,
    LibreriasModule, HorasModule, MascotasModule
  ],
  exports: [
    FormsModule, ReactiveFormsModule, RouterModule, 
    FiltroPipe, FiltroCitasPipe,
    LibreriasModule, HorasModule, MascotasModule
  ],
  providers: [
  ]
})
export class CompartidoModule { }
