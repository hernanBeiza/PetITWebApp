import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  	console.log("BuscadorComponent");
  }

  public irAgendar():void {
  	console.log("irSeleccionar");
  }

}
