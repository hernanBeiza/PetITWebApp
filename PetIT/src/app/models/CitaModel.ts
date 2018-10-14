import { MascotaModel } from './MascotaModel';
import { DuenoMascotaModel } from './DuenoMascotaModel';
import { EspecialistaModel } from './EspecialistaModel';
import { EspecialidadModel } from './EspecialidadModel';
import { HoraModel } from './HoraModel';
import { OrigenModel } from './OrigenModel';

export class CitaModel { 
	
	public idcita?: number;
	public rutmascota?: string;
	public idespecialista?: number;
	public idhora?: number;
	public origen?: number;
	public valid?: number;

	public mascotaModel?:MascotaModel;
	public duenoMascotaModel?:DuenoMascotaModel;
	public especialistaModel?:EspecialistaModel;
	public especialidadModel?:EspecialidadModel;
	public horaModel?:HoraModel;
	public origenModel?:OrigenModel;

	constructor(idcita?:number,rutmascota?:string,idespecialista?:number,idhora?:number,origen?:number,valid?:number){
		this.idcita = idcita;
		this.rutmascota = rutmascota;
		this.idespecialista = idespecialista;
		this.idhora = idhora;
		this.origen = origen;
		this.valid = valid;
	}
	
}