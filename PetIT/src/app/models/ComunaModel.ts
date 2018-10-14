
export class ComunaModel { 
	
	public idcomuna?: number;
	public idprovincia?: number;
	public nombre?: string;
	public valid?: number;

	constructor(idcomuna?:number,idprovincia?:number,nombre?:string,valid?:number){
		this.idcomuna = idcomuna;
		this.idprovincia = idprovincia;
		this.nombre = nombre;
		this.valid = valid;
	}
	
}