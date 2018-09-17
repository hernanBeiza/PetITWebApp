import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CompartidoModule } from './../../compartido/compartido.module';

import { DuenoRoutingModule } from './dueno.routing';

import { DuenoComponent } from './dueno.component';
import { InicioComponent } from './inicio/inicio.component';

// Services
import { NotificacionLocalDBService } from './../../services/NotificacionLocalDB.service';

@NgModule({
	imports: [
	    CommonModule,
	    DuenoRoutingModule,CompartidoModule
	],
	exports: [
		RouterModule,
	],
	providers: [NotificacionLocalDBService],
	declarations: [DuenoComponent, InicioComponent]
})
export class DuenoModule { }
