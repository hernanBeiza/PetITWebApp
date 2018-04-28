import { HoraModel } from './HoraModel';

export class FechaModel { 
	
	public idfecha?: number;
	public fecha?: string;
	public horas?: Array<HoraModel>;

	constructor(idfecha?:number,
		fecha?:string,
		horas?:Array<HoraModel>){
		this.idfecha = idfecha;
		this.fecha = fecha;
		this.horas = horas;
	}
	
}