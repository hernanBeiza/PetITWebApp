import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	constructor() { 
		console.log("AdminComponent();");
	}

	ngOnInit() {
		console.log("AdminComponent: ngOnInit();");
	}
	ngOnDestroy() {
		console.info("AdminComponent: ngOnDestroy();");
	}

}
