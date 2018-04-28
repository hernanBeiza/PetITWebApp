import { Component, OnInit, Input } from '@angular/core';

import { DuenoModel } from './../../../../models/DuenoModel';

@Component({
  selector: 'app-lista-encontrados',
  templateUrl: './lista-encontrados.component.html',
  styleUrls: ['./lista-encontrados.component.css']
})
export class ListaEncontradosComponent implements OnInit {

	@Input() duenos: Array<DuenoModel>;

	constructor() { }

	ngOnInit() { }

}
