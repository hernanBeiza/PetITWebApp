import { MascotaModel } from './MascotaModel';

export class DuenoModel { 
	
	public iddueno: number;
	public mascota:MascotaModel;
	public nombre: string;

	public rut: string;
	public direccion: string;


	constructor(iddueno:number,mascota:MascotaModel,nombre:string,rut:string,direccion:string){
		this.iddueno = iddueno;
		this.mascota = mascota;
		this.nombre = nombre;
		this.rut = rut;
		this.direccion = direccion;
	}
	
}