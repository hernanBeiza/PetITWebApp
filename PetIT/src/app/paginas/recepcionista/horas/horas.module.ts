import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasComponent } from './horas.component';
import { AgendarComponent } from './agendar/agendar.component';
import { BuscarComponent } from './buscar/buscar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { FinalizarComponent } from './finalizar/finalizar.component';


import { MzRadioButtonModule, MzInputModule, MzButtonModule, MzDropdownModule } from 'ng2-materialize'

@NgModule({
  imports: [
    CommonModule,
    MzRadioButtonModule,MzInputModule,MzButtonModule,MzDropdownModule
  ],
  declarations: [HorasComponent, AgendarComponent, BuscarComponent, ConsultarComponent, FinalizarComponent]
})
export class HorasModule { }
