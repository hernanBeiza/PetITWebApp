import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { HiperMenuService } from './../hipermenu/HiperMenu.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit, OnDestroy {

	public titulo: string;
	public bajada: string;
	public subscription: Subscription;

	constructor(private HiperMenuService:HiperMenuService) { 
		this.subscription = this.HiperMenuService.getMenuEventEmitter().subscribe(seccion => this.seccionSeleccionada(seccion));
	}

	ngOnInit() { }

	seccionSeleccionada(seccion:any) {
		console.log("seccionSeleccionada();");
		console.log(seccion);
		this.titulo = seccion.nombre;
		this.bajada = seccion.bajada;
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}


}