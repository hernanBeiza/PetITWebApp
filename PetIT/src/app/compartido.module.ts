import { NgModule } from '@angular/core';

import { MzNavbarModule, MzSidenavModule, MzModalModule, MzSpinnerModule, MzCardModule, MzCollapsibleModule, MzIconMdiModule } from 'ng2-materialize';
import { MzModalService, MzToastService } from 'ng2-materialize'


@NgModule({
  declarations: [

  ],
  imports: [
    MzNavbarModule, MzSidenavModule, MzModalModule,MzSpinnerModule,MzCardModule,MzCollapsibleModule,MzIconMdiModule,
  ],
  exports: [
    MzNavbarModule, MzSidenavModule, MzModalModule,MzSpinnerModule,MzCardModule,MzCollapsibleModule,MzIconMdiModule,
  ],
  providers: [
    MzModalService, MzToastService
  ]
})
export class CompartidoModule { }
