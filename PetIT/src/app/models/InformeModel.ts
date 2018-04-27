export class InformeModel { 
	
	public idinforme?: number;
	public fechaInicio?: string;
	public fechaTermino?: string;
	public valid?: number;	

	constructor(idinforme?:number, fechaInicio?:string, fechaTermino?:string,valid?:number){
		this.idinforme = idinforme;
		this.fechaInicio = fechaInicio;
		this.fechaTermino = fechaTermino;
		this.valid = valid;
	}
	
}