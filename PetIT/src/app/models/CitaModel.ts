import { DuenoModel } from './DuenoModel';
import { MascotaModel } from './MascotaModel';
import { EspecialidadModel } from './EspecialidadModel';
import { EspecialistaModel } from './EspecialistaModel';
import { HoraModel } from './HoraModel';

export class CitaModel { 
	
	public idcita?: number;
	public rutmascota?: string;
	public idespecialista?: number;
	public idhora?: number;
	public origen?: number;
	public valid?: number;

	constructor(idcita?:number,rutmascota?:string,idespecialista?:number,idhora?:number,origen?:number,valid?:number){
			this.idcita = idcita;
			this.rutmascota = rutmascota;
			this.idespecialista = idespecialista;
			this.idhora = idhora;
			this.origen = origen;
			this.valid = valid;
	}
	
}