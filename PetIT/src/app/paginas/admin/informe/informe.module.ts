import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InformeRoutingModule } from './informe.routing';


import { InformeGenerarComponent } from './informe-generar/informe-generar.component';
import { InformeComponent } from './informe.component';

import { MzDatepickerModule} from 'ng2-materialize';

import { CompartidoModule} from './../../../compartido.module';

import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
	imports: [
		CommonModule,
	    FormsModule,
	    ReactiveFormsModule,
	    CompartidoModule,
	    MzDatepickerModule,
	    ChartsModule,
	    InformeRoutingModule
	],
	providers: [],
	declarations: [InformeGenerarComponent, InformeComponent]
})
export class InformeModule { }
