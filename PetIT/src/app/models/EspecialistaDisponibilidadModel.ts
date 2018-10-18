import { EspecialistaModel } from './EspecialistaModel';
import { BloqueHorarioModel } from './BloqueHorarioModel';

export class EspecialistaDisponibilidadModel { 
	
	public idespecialistadisponibilidad?: number;
	public idespecialista?: number;
	public idbloquehorario?: number;
	public fecha?: string;
	public valid?: number;

	public especialistaModel:EspecialistaModel;
	public bloqueHorarioModel:BloqueHorarioModel;
	
	constructor(idespecialistadisponibilidad?:number, 
		idespecialista?:number, 
		idbloquehorario?:number, fecha?:string, valid?:number){
		this.idespecialistadisponibilidad = idespecialistadisponibilidad;
		this.idespecialista = idespecialista;
		this.idbloquehorario = idbloquehorario;
		this.fecha = fecha;
		this.valid = valid;
	}
	
}