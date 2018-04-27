import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		console.log("InicioComponent: ngOnInit();");
	}

	ngOnDestroy() {
    	console.info("InicioComponent: ngOnDestroy();");
	}

}
