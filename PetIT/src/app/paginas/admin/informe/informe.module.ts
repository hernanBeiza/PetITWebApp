import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InformeRoutingModule } from './informe.routing';

import { InformeGenerarComponent } from './informe-generar/informe-generar.component';

import { LibreriasModule} from './../../../librerias.module';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { InformeLocalDBService } from './../../../services/InformeLocalDB.service';

@NgModule({
	imports: [
		CommonModule,
	    RouterModule,
	    FormsModule,ReactiveFormsModule,
	    LibreriasModule,
	    ChartsModule,
	    InformeRoutingModule
	],
	exports: [
		RouterModule
	],
	providers: [InformeLocalDBService],
	declarations: [
		InformeGenerarComponent
	]
})
export class InformeModule { }