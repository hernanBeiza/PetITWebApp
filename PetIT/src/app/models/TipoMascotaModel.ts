export class TipoMascotaModel { 
	
	public idtipomascota?: number;
	public nombre?: string;
	public valid?: number;	

	constructor(idtipomascota?:number,nombre?:string,pass?:string,valid?:number){
		this.idtipomascota = idtipomascota;
		this.nombre = nombre;
		this.valid = valid;
	}
	
}