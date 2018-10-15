import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Módulos Compartidos
import { LibreriasModule } from './../librerias.module';

// Componentes Compartidos
import { CabeceraComponent } from './cabecera/cabecera.component';
import { HiperMenuComponent } from './hipermenu/hipermenu.component';
import { BotonVolverComponent } from './boton-volver/boton-volver.component';

// Servicios
import { HiperMenuService } from './hipermenu/HiperMenu.service';


@NgModule({
  declarations: [
    CabeceraComponent,
    HiperMenuComponent,
    BotonVolverComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, RouterModule,
    LibreriasModule
  ],
  exports: [
    CabeceraComponent, HiperMenuComponent, BotonVolverComponent,
    FormsModule, ReactiveFormsModule, RouterModule, 
    LibreriasModule
  ],
  providers: [
    HiperMenuService
  ]
})
export class SharedUIModule { }
