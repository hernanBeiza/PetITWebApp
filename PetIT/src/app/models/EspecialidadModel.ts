import { EspecialistaModel } from './EspecialistaModel';

export class EspecialidadModel { 
	
	public idespecialidad?: number;
	public nombre?: string;

	constructor(idespecialidad?:number,	nombre?:string){
		this.idespecialidad = idespecialidad;
		this.nombre = nombre;
	}
	
}