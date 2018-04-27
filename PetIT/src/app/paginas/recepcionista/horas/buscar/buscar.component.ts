import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  	console.log("BuscarComponent");
  }

  public irAgendar():void {
  	console.log("irSeleccionar");
    this.router.navigate(['/recepcionista/horas/agendar']);
  }

}
