import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


import { RecepcionistaComponent } from './recepcionista.component';

import { InicioComponent } from './inicio/inicio.component';
import { BuscarComponent } from './horas/buscar/buscar.component';
import { AgendarComponent } from './horas/agendar/agendar.component';
import { ConsultarComponent } from './horas/consultar/consultar.component';
import { FinalizarComponent } from './horas/finalizar/finalizar.component';
import { EnviarComponent } from './notificaciones/enviar/enviar.component';

const routes: Routes =[
  { path: 'recepcionista',  component: RecepcionistaComponent,
      children: [
      { path: 'inicio',         component: InicioComponent },
      { path: 'horas/buscar',         component: BuscarComponent },
      { path: 'horas/agendar',         component: AgendarComponent },
      { path: 'horas/consultar',         component: ConsultarComponent },
      { path: 'horas/finalizar',         component: FinalizarComponent },
      { path: 'notificaciones/enviar',         component: EnviarComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [
    RouterModule
  ],
})
export class RecepcionistaRoutingModule { }

