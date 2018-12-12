import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Mensajes } from './../../../../libs/Mensajes';
import { Validaciones } from './../../../../libs/Validaciones';

import { InformeModel } from './../../../../models/InformeModel';

import { InformeLocalDBService } from './../../../../services/InformeLocalDB.service';

import { MzToastService } from 'ng2-materialize';

import * as moment from 'moment'; 

@Component({
  selector: 'app-informe-generar',
  templateUrl: './informe-generar.component.html',
  styleUrls: ['./informe-generar.component.css']
})
export class InformeGenerarComponent implements OnInit {

	public generarForm:FormGroup;
	public tipo:AbstractControl;
	public inicio:AbstractControl;
	public termino:AbstractControl;

	public informeModel:InformeModel = new InformeModel();

	public enviandoFlag:boolean = false;
	public mostrarBarra:boolean = false;
	public mostrarPie:boolean = false;

	public opcionesCalendario: Pickadate.DateOptions = {
		format: 'dd-mm-yyyy',
		formatSubmit: 'dd-mm-yyyy',
	    //max: new Date(),
	    today: 'Hoy',
	    clear: 'Limpiar',
	    close: 'OK'
	};

	// Errores
	public formErrors = Mensajes.validacionesGenerarInforme;
	//https://stackblitz.com/edit/ng2-chart-example-22wq6w?file=app%2Fbar-chart.options.ts
	//https://github.com/valor-software/ng2-charts/issues/1011
	//Gráfico de Barra
	public barChartOptions:any = {
    	scaleShowVerticalLines: true,
	    responsive: true,
	    /*
	    title: {
		    display: true,
		    text: 'My Chart Title',
		    fontColor: 'black',
		},
		*/
		scales: {
		xAxes: [{
		stacked: false,
		ticks: {
		fontColor: 'black',
		},
		gridLines: {
		color: '#dbd9d9'
		}
		}],
		yAxes: [{
			stacked: false,
			ticks: {
			fontColor: 'black',
			min: 0,
			beginAtZero: true,

			},
			gridLines: {
				color: '#dbd9d9'
			},
			scaleLabel: {
					//display: true,
					//labelString: 'Scale Label',
					//fontColor: 'black',
				}
		}]
		},
		legend: {
		    display: true,
		    labels: {
		      fontColor: 'black'
		    }
		},
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
 
 	public tipos:Array<any> = new Array<any>(
 		{id:1,texto:"Total de horas"},
 		//{id:2,texto:"Total de mascotas por tipo"},
 		//{id:3,texto:"Total de mascotas por raza"},
 		{id:4,texto:"Total de horas por especialidad"},
 		{id:5,texto:"Total de notificaciones leídas"},
	);
 	public tipoInforme:number = 1;

	constructor(private fb:FormBuilder, private MzToastService: MzToastService,
		private InformeLocalDBService:InformeLocalDBService) { }

	ngOnInit() {
		console.log("ngOnInit();");

	    this.generarForm = this.fb.group({
	      'tipo': [this.tipoInforme, Validators.compose([Validators.required])],
	      'inicio': [this.informeModel.fechaInicio, Validators.compose([Validators.required])],
	      'termino': [this.informeModel.fechaTermino, Validators.compose([Validators.required])]
	    });

	    this.tipo = this.generarForm.controls['tipo'];
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
		console.log(this.tipoInforme);
		this.informeModel.idinforme = this.tipoInforme;
		console.log(this.informeModel);
		this.enviandoFlag = true;
		this.mostrarBarra = false;
		this.mostrarPie = false;

		let inicio = moment(this.informeModel.fechaInicio,"DD-MM-YYYY").format("YYYY-MM-DD");
		let termino = moment(this.informeModel.fechaTermino,"DD-MM-YYYY").format("YYYY-MM-DD");
		//console.log(inicio,termino);
		switch (this.tipoInforme) {
			case 1:
				this.generarTotalDeCitasPorMes(inicio,termino);
				break;
			case 2:
				//this.generarTotalDeMascotasPorTipo(inicio,termino);
				break;
			case 3:
				//this.generarTotalDeMascotasPorRaza(inicio,termino);
				break;
			case 4:
				this.generarTotalDeCitasPorEspecialidad(inicio,termino);
				break;
			case 5:
				this.generarTotalDeNotificacionesLeidas(inicio,termino);
				break;			
		}
		/*
		this.randomize();
		*/
	}
	
	// Eventos del Gráfico
	public chartClicked(e:any):void {
    	console.log(e);
	}
 
	public chartHovered(e:any):void {
    	console.log(e);
	}
 	
 	//https://valor-software.com/ng2-charts/
 	/*
	public randomize():void {
		this.enviandoFlag = false;
		this.mostrarBarra = true;
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
	}
	*/
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */

	private generarTotalDeCitasPorMes(inicio:string,termino:string):void {
		this.InformeLocalDBService.generarTotalCitasPorMes(inicio,termino).then((data:any) => {
			console.log(data);
			this.enviandoFlag = false;

			if(data.result){
				this.mostrarBarra = true;

			    this.barChartLabels = [];
			    this.barChartData = [];

			    this.MzToastService.show(data.mensajes,3000);		
			    for (var i = 0; i < data.estadisticas.length; i++) {
			    	var estadistica = data.estadisticas[i] as any;
				    this.barChartData.push({data:[estadistica.total],label: estadistica.nombre});
				    //this.barChartLabels.push(estadistica.nombre);
			    }

			    //this.randomize();
			    console.log(this.barChartData);
			    console.log(this.barChartLabels);

			} else {
			    this.MzToastService.show(data.errores,3000,'red');
			}

	    },(dataError)=>{
			console.error(dataError);
			this.enviandoFlag = false;
			this.MzToastService.show(dataError.errores,4000,'red');
	    });
	}

	private generarTotalDeMascotasPorTipo(inicio:string,termino:string):void {
		this.InformeLocalDBService.generarTotalDeMascotasPorTipo(inicio,termino).then((data:any) => {
			console.log(data);
			this.enviandoFlag = false;

			if(data.result){
				this.mostrarPie = true;

				this.pieChartLabels = [];
				this.pieChartData = [];

			    this.MzToastService.show(data.mensajes,3000);			
			    for (var i = 0; i < data.estadisticas.length; i++) {
			    	let estadistica = data.estadisticas[i] as any;
					this.pieChartLabels.push(estadistica.nombre);
				    this.pieChartData.push(estadistica.total);
			    }
			} else {
			    this.MzToastService.show(data.errores,3000,'red');
			}

	    },(dataError)=>{
			console.error(dataError);
			this.enviandoFlag = false;
			this.MzToastService.show(dataError.errores,4000,'red');
	    });
	}

	private generarTotalDeMascotasPorRaza(inicio:string,termino:string):void {
		this.InformeLocalDBService.generarTotalDeMascotasPorRaza(inicio,termino).then((data:any) => {
			console.log(data);
			this.enviandoFlag = false;

			if(data.result){
				this.mostrarPie = true;

				this.pieChartLabels = [];
				this.pieChartData = [];

			    this.MzToastService.show(data.mensajes,3000);			
			    for (var i = 0; i < data.estadisticas.length; i++) {
			    	let estadistica = data.estadisticas[i] as any;
					this.pieChartLabels.push(estadistica.nombre);
				    this.pieChartData.push(estadistica.total);
			    }
			} else {
			    this.MzToastService.show(data.errores,3000,'red');
			}

	    },(dataError)=>{
			console.error(dataError);
			this.enviandoFlag = false;
			this.MzToastService.show(dataError.errores,4000,'red');
	    });
	}

	private generarTotalDeCitasPorEspecialidad(inicio:string,termino:string):void {
		this.InformeLocalDBService.generarTotalDeCitasPorEspecialidad(inicio,termino).then((data:any) => {
			console.log(data);
			this.enviandoFlag = false;

			if(data.result){
				this.mostrarPie = true;

				this.pieChartLabels = [];
				this.pieChartData = [];

			    this.MzToastService.show(data.mensajes,3000);			
			    for (var i = 0; i < data.estadisticas.length; i++) {
			    	let estadistica = data.estadisticas[i] as any;
					this.pieChartLabels.push(estadistica.nombre);
				    this.pieChartData.push(estadistica.total);
			    }
			} else {
			    this.MzToastService.show(data.errores,3000,'red');
			}

	    },(dataError)=>{
			console.error(dataError);
			this.enviandoFlag = false;
			this.MzToastService.show(dataError.errores,4000,'red');
	    });
	}
	
	private generarTotalDeNotificacionesLeidas(inicio:string,termino:string):void {
		this.InformeLocalDBService.generarTotalDeNotificacionesLeidas(inicio,termino).then((data:any) => {
			console.log(data);
			this.enviandoFlag = false;

			if(data.result){
				this.mostrarBarra = true;

			    this.barChartLabels = [];
			    this.barChartData = [];

			    this.MzToastService.show(data.mensajes,3000);			
			    for (var i = 0; i < data.estadisticas.length; i++) {
			    	let estadistica = data.estadisticas[i] as any;
				    this.barChartData.push({data:[estadistica.total],label: estadistica.nombre});
			    }
			} else {
			    this.MzToastService.show(data.errores,3000,'red');
			}

	    },(dataError)=>{
			console.error(dataError);
			this.enviandoFlag = false;
			this.MzToastService.show(dataError.errores,4000,'red');
	    });
	}

	ngOnDestroy() {
    	console.info("ngOnDestroy();");
	}

}
