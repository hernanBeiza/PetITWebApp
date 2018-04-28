import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {CitaLocalDBService} from './../../../../services/CitaLocalDB.service';
import {CitaModel} from './../../../../models/CitaModel';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  public filtroString: string = ""
  public filtroField: string = "nombre";

  public citas:Array<CitaModel> = new Array<CitaModel>();
  constructor(private router:Router,
    private CitaLocalDBService:CitaLocalDBService) { }

  ngOnInit() {
  	console.log("BuscadorComponent");
    this.citas = this.CitaLocalDBService.obtenerVarios();
  }

  public irAgendar():void {
  	console.log("irSeleccionar");
  }

}
