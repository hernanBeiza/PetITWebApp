import { Output } from '@angular/core';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class HiperMenuService {

	public menuEventEmmiter: EventEmitter<any>;
	
	constructor() {
		this.menuEventEmmiter = new EventEmitter<any>();
		//console.log("HiperMenuService");
	}

	public getMenuEventEmitter():EventEmitter<any>{
		return this.menuEventEmmiter;
	}

	enviar(seccion:any) {
    	this.menuEventEmmiter.emit(seccion);
	}

}