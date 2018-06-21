import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

	public titulo: string;
	public bajada: string;

	constructor() {
	 
	}

	ngOnInit() {

	}

}