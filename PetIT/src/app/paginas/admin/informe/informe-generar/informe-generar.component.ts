import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Mensajes } from './../../../../libs/Mensajes';
import { Validaciones } from './../../../../libs/Validaciones';

import { InformeModel } from './../../../../models/InformeModel';

import { MzToastService } from 'ng2-materialize';

@Component({
  selector: 'app-informe-generar',
  templateUrl: './informe-generar.component.html',
  styleUrls: ['./informe-generar.component.css']
})
export class InformeGenerarComponent implements OnInit {

	public generarForm:FormGroup;
	public inicio:AbstractControl;
	public termino:AbstractControl;

	public informeModel:InformeModel = new InformeModel();

	public enviandoFlag:boolean = false;
	public mostrar:boolean = false;

	public opcionesCalendario: Pickadate.DateOptions = {
		format: 'dd-mm-yyyy',
		formatSubmit: 'dd-mm-yyyy',
	};

	// Errores
	/*
	public formErrors = {
		'inicio': '',
		'termino': ''
	};
	*/
	public formErrors = Mensajes.validacionesGenerarInforme;

	//Gráfico de Barra
	public barChartOptions:any = {
    	scaleShowVerticalLines: false,
	    responsive: true
	};
	public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartType:string = 'bar';
	public barChartLegend:boolean = true;

	public barChartData:any[] = [
		{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
		{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
	];
	//Gráfico Pie
	public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
	public pieChartData:number[] = [300, 500, 100];
	public pieChartType:string = 'pie';
 
	constructor(private fb:FormBuilder,
		private MzToastService: MzToastService) { 
		console.log("InformeGenerarComponent");
	}

	ngOnInit() {
		console.log("InformeGenerarComponent: ngOnInit();");

	    this.generarForm = this.fb.group({
	      'inicio': [this.informeModel.fechaInicio, Validators.compose([Validators.required])],
	      'termino': [this.informeModel.fechaTermino, Validators.compose([Validators.required])]
	    });

	    this.inicio = this.generarForm.controls['inicio'];
	    this.termino = this.generarForm.controls['termino'];

	    //this.generarForm.valueChanges.subscribe(data => this.onValueChanged(data));
	    //this.onValueChanged(); // (re)set validation messages now
	}

	public onSubmit(values:Object):void {
	    if (this.generarForm.valid) {
			this.generarInforme();      
	    }
	}

	public generarInforme():void {
		console.log("generarInforme");
		console.log(this.informeModel);
		this.enviandoFlag = true;
	    this.MzToastService.show("Estadísticas Generadas",3000);
		this.randomize();
	}

	private onValueChanged(data?: any) {
		console.log(this.formErrors);
    	this.formErrors = Validaciones.onValueChanged(data,this.generarForm,this.formErrors,Mensajes.validacionesGenerarInforme);  
	}

	
	// Eventos del Gráfico
	public chartClicked(e:any):void {
    	console.log(e);
	}
 
	public chartHovered(e:any):void {
    	console.log(e);
	}
 	
 	//https://valor-software.com/ng2-charts/
	public randomize():void {
		this.enviandoFlag = false;
		this.mostrar = true;
	    // Only Change 3 values
	    let data = [
	      Math.round(Math.random() * 100),
	      59,
	      80,
	      (Math.random() * 100),
	      56,
	      (Math.random() * 100),
	      40];
	    let clone = JSON.parse(JSON.stringify(this.barChartData));
	    clone[0].data = data;
	    this.barChartData = clone;
	    /**
	     * (My guess), for Angular to recognize the change in the dataset
	     * it has to change the dataset variable directly,
	     * so one way around it, is to clone the data, change it and then
	     * assign it;
	     */
	}

	ngOnDestroy() {
    	console.info("GenerarFormComponent: ngOnDestroy();");
	}

}
