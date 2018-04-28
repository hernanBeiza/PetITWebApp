import { DuenoModel } from './DuenoModel';
import { MascotaModel } from './MascotaModel';
import { EspecialidadModel } from './EspecialidadModel';
import { EspecialistaModel } from './EspecialistaModel';
import { FechaModel } from './FechaModel';
import { HoraModel } from './HoraModel';


export class CitaModel { 
	
	public dueno?: DuenoModel;
	public mascota?: MascotaModel;
	public especialidad?: EspecialidadModel;
	public especialista?: EspecialistaModel;
	public fecha?: FechaModel;
	public hora?: HoraModel;

	constructor(dueno?:DuenoModel, 
		mascota?:MascotaModel, 
		especialidad?:EspecialidadModel, 
		especialista?:EspecialistaModel,
		fecha?:FechaModel,
		hora?:HoraModel){
			this.dueno = dueno;
			this.mascota = mascota;
			this.especialidad = especialidad;
			this.especialista = especialista;
			this.fecha = fecha;
			this.hora = hora;
	}
	
}