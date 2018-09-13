import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

import { LocalDBService } from './services/LocalDB.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
	constructor(public location: Location, public router: Router, 
		private LocalDBService:LocalDBService) {
		//console.log("AppComponent");
	}

	ngOnInit() {
		//console.log("AppComponent: ngOnInit();");
		//console.log(this.location.path());
	  	/*
	    if (this.location.path() =='' || this.location.path() == '/home') {
	      this.router.navigate(['/home/dashboard']);
	    }
	    */
    }

}
