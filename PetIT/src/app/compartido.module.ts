import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LibreriasModule } from './librerias.module';


// Pipes, filtro
import { FiltroPipe } from './pipes/filtro.pipe';
import { FiltroCitasPipe } from './pipes/filtroCitas.pipe';

// Componentes Compartidos
import { CabeceraComponent } from './compartido/cabecera/cabecera.component';
import { HiperMenuComponent } from './compartido/hipermenu/hipermenu.component';
import { ListarMascotasComponent } from './compartido/listar-mascotas/listar-mascotas.component';

// Servicios
import { HiperMenuService } from './compartido/hipermenu/HiperMenu.service';

@NgModule({
  declarations: [
    FiltroPipe,FiltroCitasPipe,
    CabeceraComponent,
    HiperMenuComponent,
    ListarMascotasComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, RouterModule,
    LibreriasModule
  ],
  exports: [
    CabeceraComponent,HiperMenuComponent,ListarMascotasComponent,
    FormsModule, ReactiveFormsModule, RouterModule, 
    FiltroPipe,FiltroCitasPipe,
    LibreriasModule
  ],
  providers: [
    HiperMenuService
  ]
})
export class CompartidoModule { }
