import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin.routing';
import { InformeModule } from './informe/informe.module';

import { AdminComponent } from './admin.component';
import { MenuComponent } from './menu/menu.component';

import { InicioComponent } from './inicio/inicio.component';

import { CompartidoModule } from './../../compartido.module';

import { CitaLocalDBService } from './../../services/CitaLocalDB.service';

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
	providers: [
		CitaLocalDBService
	],
	declarations: [MenuComponent, AdminComponent, InicioComponent]
})
export class AdminModule { }
