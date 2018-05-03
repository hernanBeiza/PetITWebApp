import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DuenoRoutingModule } from './dueno.routing';

import { DuenoComponent } from './dueno.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';

import { CompartidoModule } from './../../compartido.module';

@NgModule({
	imports: [
	    CommonModule,
	    CompartidoModule,
	    DuenoRoutingModule,
	],
	exports: [
		RouterModule
	],
	providers: [],
	declarations: [DuenoComponent, MenuComponent, InicioComponent]
})
export class DuenoModule { }
