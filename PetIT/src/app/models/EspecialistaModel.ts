import { FechaModel } from './FechaModel';

export class EspecialistaModel { 
	
	public idespecialista?: number;
	public nombre?: string;

	constructor(idespecialista?:number, nombre?:string){
		this.idespecialista = idespecialista;
		this.nombre = nombre;
	}
	
}
