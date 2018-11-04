import { MascotaModel } from './MascotaModel';
import { DuenoMascotaModel } from './DuenoMascotaModel';
import { EspecialistaModel } from './EspecialistaModel';
import { EspecialistaDisponibilidadModel } from './EspecialistaDisponibilidadModel';
import { EspecialidadModel } from './EspecialidadModel';
import { OrigenModel } from './OrigenModel';

export class CitaModel { 
	
	public idcita?: number;
	public rutmascota?: string;
	public idespecialistadisponibilidad?: number;
	public idhora?: number;
	public origen?: number;
	public valid?: number;

	public mascotaModel?:MascotaModel;
	public duenoMascotaModel?:DuenoMascotaModel;
	public especialistaModel?:EspecialistaModel;
	public especialistaDisponibilidadModel?:EspecialistaDisponibilidadModel;
	public especialidadModel?:EspecialidadModel;
	public origenModel?:OrigenModel;

	constructor(idcita?:number,rutmascota?:string,idespecialistadisponibilidad?:number,origen?:number,valid?:number){
		this.idcita = idcita;
		this.rutmascota = rutmascota;
		this.idespecialistadisponibilidad = idespecialistadisponibilidad;
		this.origen = origen;
		this.valid = valid;
	}
	
}