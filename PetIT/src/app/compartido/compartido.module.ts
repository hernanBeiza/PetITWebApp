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


// Componentes Compartidos
import { CabeceraComponent } from './cabecera/cabecera.component';
import { HiperMenuComponent } from './hipermenu/hipermenu.component';

// Servicios
import { HiperMenuService } from './hipermenu/HiperMenu.service';

@NgModule({
  declarations: [
    FiltroPipe,FiltroCitasPipe,
    CabeceraComponent,
    HiperMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, RouterModule,
    LibreriasModule, HorasModule, MascotasModule
  ],
  exports: [
    CabeceraComponent,HiperMenuComponent,
    FormsModule, ReactiveFormsModule, RouterModule, 
    FiltroPipe, FiltroCitasPipe,
    LibreriasModule, HorasModule, MascotasModule
  ],
  providers: [
    HiperMenuService
  ]
})
export class CompartidoModule { }
