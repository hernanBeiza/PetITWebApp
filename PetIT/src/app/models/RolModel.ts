export class RolModel { 
	
	public idrol?: number;
	public nombre?: string;
	public valid?: number;	

	constructor(idrol?:number,nombre?:string,valid?:number){
		this.idrol = idrol;
		this.nombre = nombre;
		this.valid = valid;
	}
	
}