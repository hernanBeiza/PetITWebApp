import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MzNavbarModule, MzSidenavModule, MzModalModule, MzSpinnerModule, MzCardModule, 
  MzCollapsibleModule, MzIconMdiModule, MzRadioButtonModule, MzInputModule, MzButtonModule, 
  MzSelectModule, MzValidationModule, MzDatepickerModule, MzTimepickerModule } from 'ng2-materialize';
import { MzModalService, MzToastService } from 'ng2-materialize'

// Pipes, filtro
import { FiltroPipe } from './pipes/filtro.pipe';

import { Ng2Rut, RutValidator } from 'ng2-rut';

@NgModule({
  declarations: [
    FiltroPipe
  ],
  imports: [
    FormsModule, ReactiveFormsModule, RouterModule,
    Ng2Rut,
    MzNavbarModule, MzSidenavModule, MzModalModule,MzSpinnerModule,MzCardModule,MzCollapsibleModule,
    MzIconMdiModule, MzRadioButtonModule, MzInputModule, MzButtonModule, MzSelectModule, MzValidationModule, 
    MzDatepickerModule, MzTimepickerModule
  ],
  exports: [
    FormsModule, ReactiveFormsModule, RouterModule, 
    Ng2Rut,
    MzNavbarModule, MzSidenavModule, MzModalModule,MzSpinnerModule,MzCardModule,MzCollapsibleModule,
    MzIconMdiModule, MzRadioButtonModule, MzInputModule, MzButtonModule, MzSelectModule, MzValidationModule, 
    MzDatepickerModule, MzTimepickerModule, 
    FiltroPipe
  ],
  providers: [
    MzModalService, MzToastService, RutValidator
  ]
})
export class CompartidoModule { }
