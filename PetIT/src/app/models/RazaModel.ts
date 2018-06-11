export class RazaModel { 
	
	public idraza?: number;
	public nombre?: string;
	public valid?: number;	

	constructor(idraza?:number,nombre?:string,pass?:string,valid?:number){
		this.idraza = idraza;
		this.nombre = nombre;
		this.valid = valid;
	}
	
}