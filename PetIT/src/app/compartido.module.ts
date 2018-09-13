import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MzNavbarModule, MzSidenavModule, MzModalModule, MzSpinnerModule, MzCardModule, 
  MzCollapsibleModule, MzIconMdiModule, MzRadioButtonModule, MzInputModule, MzButtonModule, 
  MzSelectModule, MzValidationModule, MzDatepickerModule, MzTimepickerModule, MzPaginationModule, MzCheckboxModule, MzTextareaModule, MzTooltipModule } from 'ng2-materialize';
import { MzModalService, MzToastService } from 'ng2-materialize';

// Pipes, filtro
import { FiltroPipe } from './pipes/filtro.pipe';

import { Ng2Rut, RutValidator } from 'ng2-rut';

// Componentes Compartidos
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { HiperMenuComponent } from './components/hipermenu/hipermenu.component';
import { HiperMenuService } from './services/HiperMenu.service';

@NgModule({
  declarations: [
    FiltroPipe,
    CabeceraComponent,
    HiperMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, RouterModule,
    Ng2Rut,
    MzNavbarModule, MzSidenavModule, MzModalModule,MzSpinnerModule,MzCardModule,MzCollapsibleModule,
    MzIconMdiModule, MzRadioButtonModule, MzInputModule, MzButtonModule, MzSelectModule, MzValidationModule, 
    MzDatepickerModule, MzTimepickerModule, MzPaginationModule, MzCheckboxModule, MzTextareaModule, MzTooltipModule
  ],
  exports: [
    CabeceraComponent,HiperMenuComponent,
    FormsModule, ReactiveFormsModule, RouterModule, 
    Ng2Rut,
    MzNavbarModule, MzSidenavModule, MzModalModule,MzSpinnerModule,MzCardModule,MzCollapsibleModule,
    MzIconMdiModule, MzRadioButtonModule, MzInputModule, MzButtonModule, MzSelectModule, MzValidationModule, 
    MzDatepickerModule, MzTimepickerModule, MzPaginationModule, MzCheckboxModule, MzTextareaModule, MzTooltipModule,
    FiltroPipe
  ],
  providers: [
    MzModalService, MzToastService, RutValidator,
    HiperMenuService
  ]
})
export class CompartidoModule { }
