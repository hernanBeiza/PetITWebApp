export class OrigenModel { 
	
	public idorigen?: number;
	public nombre?: string;
	public valid?: number;	

	constructor(idorigen?:number,nombre?:string,valid?:number){
		this.idorigen = idorigen;
		this.nombre = nombre;
		this.valid = valid;
	}
	
}