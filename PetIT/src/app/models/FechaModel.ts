import * as moment from 'moment'; 

import { BloqueHorarioModel} from './BloqueHorarioModel';

export class FechaModel { 
	
	public idFecha?: number;
	public fecha?: Date;
	public bloqueHorarioModel?: BloqueHorarioModel;

	public seleccionado?:boolean = false;

	constructor(idFecha:number,fecha:Date,bloqueHorario?:BloqueHorarioModel){
		this.idFecha = idFecha;
		this.fecha = fecha;
		this.bloqueHorarioModel = bloqueHorario;
	}
	
	public obtenerFechaEnString():string {
		let fecha =  moment(this.fecha).format('DD-MM-YYYY');						
		return fecha;
	}

}