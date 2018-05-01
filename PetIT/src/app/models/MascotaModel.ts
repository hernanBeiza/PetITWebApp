import { DuenoModel } from './DuenoModel';

export class MascotaModel { 
	
	public idmascota?: number;
	public iddueno?: number;
	public nombre?: string;

	constructor(idmascota?:number, iddueno?:number, nombre?:string){
		this.idmascota = idmascota;
		this.iddueno = iddueno;
		this.nombre = nombre;
	}
	
}