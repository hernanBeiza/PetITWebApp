import { Output } from '@angular/core';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import "rxjs/add/observable/of";

@Injectable()
export class HiperMenuService {

	@Output() seccionEmmiter: EventEmitter<boolean> = new EventEmitter();

	constructor() { 
		//console.log("HiperMenuService");
	}

	enviar(seccion:any) {
    	this.seccionEmmiter.emit(seccion);
	}

}