import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MzNavbarModule, MzSidenavModule, MzModalModule, MzSpinnerModule, MzCardModule, 
  MzCollapsibleModule, MzIconMdiModule, MzRadioButtonModule, MzInputModule, MzButtonModule, 
  MzSelectModule, MzValidationModule, MzDatepickerModule, MzTimepickerModule, MzPaginationModule, MzCheckboxModule, MzTextareaModule, MzTooltipModule } from 'ng2-materialize';
import { MzModalService, MzToastService } from 'ng2-materialize';

import { Ng2Rut, RutValidator } from 'ng2-rut';


@NgModule({
  declarations: [
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
    FormsModule, ReactiveFormsModule, RouterModule, 
    Ng2Rut,
    MzNavbarModule, MzSidenavModule, MzModalModule,MzSpinnerModule,MzCardModule,MzCollapsibleModule,
    MzIconMdiModule, MzRadioButtonModule, MzInputModule, MzButtonModule, MzSelectModule, MzValidationModule, 
    MzDatepickerModule, MzTimepickerModule, MzPaginationModule, MzCheckboxModule, MzTextareaModule, MzTooltipModule,
  ],
  providers: [
    MzModalService, MzToastService, RutValidator
  ]
})
export class LibreriasModule { }
