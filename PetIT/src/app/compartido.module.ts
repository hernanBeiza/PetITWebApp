import { NgModule } from '@angular/core';

import { MzNavbarModule, MzSidenavModule, MzModalModule, MzSpinnerModule, MzCardModule, MzCollapsibleModule, MzIconMdiModule } from 'ng2-materialize';
import { MzModalService, MzToastService } from 'ng2-materialize'

// Pipes, filtro
import { FiltroPipe } from './pipes/filtro.pipe';

@NgModule({
  declarations: [
    FiltroPipe
  ],
  imports: [
    MzNavbarModule, MzSidenavModule, MzModalModule,MzSpinnerModule,MzCardModule,MzCollapsibleModule,MzIconMdiModule,
  ],
  exports: [
    MzNavbarModule, MzSidenavModule, MzModalModule,MzSpinnerModule,MzCardModule,MzCollapsibleModule,MzIconMdiModule,
    FiltroPipe
  ],
  providers: [
    MzModalService, MzToastService
  ]
})
export class CompartidoModule { }
