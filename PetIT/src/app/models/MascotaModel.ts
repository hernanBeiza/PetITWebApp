import { DuenoModel } from './DuenoModel';

export class MascotaModel { 
	
	public idmascota?: number;
	public nombre?: string;

	constructor(idmascota?:number, nombre?:string){
		this.idmascota = idmascota;
		this.nombre = nombre;
	}
	
}