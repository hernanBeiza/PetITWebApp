import { DuenoMascotaModel } from './DuenoMascotaModel';
import { RazaModel } from './RazaModel';
import { TipoMascotaModel } from './TipoMascotaModel';

export class MascotaModel { 
	
	public rutmascota?: string;
	public idtipomascota?: number;
	public idraza?: number;
	public rutdueno?: string;
	public nombre?: string;
	public peso?: string;
	public edad?: string;
	public valid?: number;

	public razaModel:RazaModel;
	public tipoMascotaModel:TipoMascotaModel;
	
	constructor(rutmascota?:string,idtipomascota?:number,idraza?:number,rutdueno?:string,
		nombre?:string,
		peso?:string,
		edad?:string,
		valid?:number){
		this.rutmascota = rutmascota;
		this.idtipomascota = idtipomascota;
		this.idraza = idraza;
		this.rutdueno = rutdueno;
		this.nombre = nombre;
		this.peso = peso;
		this.edad = edad;
		this.valid = valid;
	}
	
}