import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

	@Input() titulo: string;

	constructor() { }

	ngOnInit() {
		console.log("Cabecera");
		console.log(this.titulo);
	}

}
