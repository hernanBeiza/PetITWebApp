import { EspecialistaModel } from './EspecialistaModel';
import { BloqueHorarioModel } from './BloqueHorarioModel';

import * as moment from 'moment'; 

export class EspecialistaDisponibilidadModel { 
	
	public idespecialistadisponibilidad?: number;
	public idespecialista?: number;
	public idbloquehorario?: number;
	public fecha?: string;
	public valid?: number;

	public especialistaModel:EspecialistaModel;
	public bloqueHorarioModel:BloqueHorarioModel;
	
	public seleccionado:boolean;
	
	constructor(idespecialistadisponibilidad?:number, 
		idespecialista?:number, 
		idbloquehorario?:number, fecha?:string, valid?:number){
		this.idespecialistadisponibilidad = idespecialistadisponibilidad;
		this.idespecialista = idespecialista;
		this.idbloquehorario = idbloquehorario;
		this.fecha = fecha;
		this.valid = valid;
	}
	
	public obtenerFechaEnHumano():string {
		let fecha = moment(new Date(this.fecha)).utc(false).format("DD-MM-YYYY");
		return fecha;
	}
}