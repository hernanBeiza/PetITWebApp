import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin.routing';
import { InformeModule } from './informe/informe.module';

import { AdminComponent } from './admin.component';
import { MenuComponent } from './menu/menu.component';

import { InicioComponent } from './inicio/inicio.component';

import { CompartidoModule } from './../../compartido.module';

@NgModule({
	imports: [
	    CommonModule,
	    CompartidoModule,
	    AdminRoutingModule,
	    InformeModule
	],
	exports: [
		RouterModule
	],
	providers: [],
	declarations: [MenuComponent, AdminComponent, InicioComponent]
})
export class AdminModule { }
