import { MascotaModel } from './MascotaModel';

export class DuenoModel { 
	
	public iddueno?: number;
	public idusuario?: number;
	public rut?: string;
	public nombre?: string
	public direccion?: string;

	public mascota?:MascotaModel;


	constructor(iddueno?:number,idusuario?:number,rut?:string,nombre?:string,direccion?:string, mascota?:MascotaModel){
		this.iddueno = iddueno;
		this.idusuario = idusuario;
		this.nombre = nombre;
		this.rut = rut;
		this.direccion = direccion;
		this.mascota = mascota;
	}
	
}