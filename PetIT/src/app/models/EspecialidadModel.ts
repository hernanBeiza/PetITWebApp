import { EspecialistaModel } from './EspecialistaModel';

export class EspecialidadModel { 
	
	public idespecialidad?: number;
	public nombre?: string;
	public especialistas?: Array<EspecialistaModel>;

	constructor(idespecialidad?:number,
		nombre?:string, 
		especialistas?:Array<EspecialistaModel>){
		this.idespecialidad = idespecialidad;
		this.especialistas = especialistas;
		this.nombre = nombre;
	}
	
}