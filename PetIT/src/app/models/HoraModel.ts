import { EspecialistaModel } from './EspecialistaModel';


export class HoraModel {
	
	public idhora?: number;
	public idespecialista?: number;
	public fecha?: string;
	public hora?: string;
	public valid?: number;
	
	public especialistaModel?:EspecialistaModel;

	constructor(idhora?:number,idespecialista?:number,fecha?:string,hora?:string,valid?:number){
		this.idhora = idhora;
		this.idespecialista = idespecialista;
		this.fecha = fecha;
		this.hora = hora;
		this.valid = valid;
	}

	
}