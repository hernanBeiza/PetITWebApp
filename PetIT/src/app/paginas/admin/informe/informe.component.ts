import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  constructor() { 
  	console.log("InformeComponent");
  }

  ngOnInit() {
  	console.log("InformeComponent: ngOnInit();");
  }

}
