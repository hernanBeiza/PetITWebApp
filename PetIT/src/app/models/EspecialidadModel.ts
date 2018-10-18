import { EspecialistaModel } from './EspecialistaModel';

export class EspecialidadModel { 
	
	public idespecialidad?: number;
	public nombre?: string;
	public valid?: number;

	constructor(idespecialidad?:number,	nombre?:string, valid?:number){
		this.idespecialidad = idespecialidad;
		this.nombre = nombre;
		this.valid = valid;
	}
	
}