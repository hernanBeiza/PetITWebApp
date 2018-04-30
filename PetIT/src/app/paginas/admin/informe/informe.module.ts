import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InformeRoutingModule } from './informe.routing';

import { InformeGenerarComponent } from './informe-generar/informe-generar.component';
import { InformeComponent } from './informe.component';

import { CompartidoModule} from './../../../compartido.module';

import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
	imports: [
		CommonModule,
	    RouterModule,
	    FormsModule,ReactiveFormsModule,
	    CompartidoModule,
	    ChartsModule,
	    InformeRoutingModule
	],
	exports: [
		RouterModule
	],
	providers: [],
	declarations: [
		InformeComponent,
		InformeGenerarComponent
	]
})
export class InformeModule { }