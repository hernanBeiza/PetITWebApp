import { FechaModel } from './FechaModel';

export class EspecialistaModel { 
	
	public idespecialista?: number;
	public nombre?: string;
	public fechas?: Array<FechaModel>;

	constructor(idespecialista?:number, 
		nombre?:string, 		
		fechas?:Array<FechaModel>){
		this.idespecialista = idespecialista;
		this.nombre = nombre;
		this.fechas = fechas;
	}
	
}
