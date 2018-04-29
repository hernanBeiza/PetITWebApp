import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MzNavbarModule, MzSidenavModule, MzModalModule, MzSpinnerModule, MzCardModule, 
  MzCollapsibleModule, MzIconMdiModule, MzRadioButtonModule, MzInputModule, MzButtonModule, 
  MzSelectModule, MzValidationModule, MzDatepickerModule } from 'ng2-materialize';
import { MzModalService, MzToastService } from 'ng2-materialize'

// Pipes, filtro
import { FiltroPipe } from './pipes/filtro.pipe';

@NgModule({
  declarations: [
    FiltroPipe
  ],
  imports: [
    FormsModule, ReactiveFormsModule, RouterModule,
    MzNavbarModule, MzSidenavModule, MzModalModule,MzSpinnerModule,MzCardModule,MzCollapsibleModule,
    MzIconMdiModule, MzRadioButtonModule, MzInputModule, MzButtonModule, MzSelectModule, MzValidationModule, 
    MzDatepickerModule
  ],
  exports: [
    FormsModule, ReactiveFormsModule, RouterModule, 
    MzNavbarModule, MzSidenavModule, MzModalModule,MzSpinnerModule,MzCardModule,MzCollapsibleModule,
    MzIconMdiModule, MzRadioButtonModule, MzInputModule, MzButtonModule, MzSelectModule, MzValidationModule, 
    MzDatepickerModule,
    FiltroPipe
  ],
  providers: [
    MzModalService, MzToastService
  ]
})
export class CompartidoModule { }
