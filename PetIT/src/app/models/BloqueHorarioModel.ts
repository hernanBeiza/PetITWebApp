export class BloqueHorarioModel { 
	
	public idbloquehorario?: number;
	public horainicio?: string;
	public horatermino?: string;
	public valid?: number;

	constructor(idbloquehorario?:number,horainicio?:string,horatermino?:string,valid?:number){
		this.idbloquehorario = idbloquehorario;
		this.horainicio = horainicio;
		this.horatermino = horatermino;
		this.valid = valid;
	}
	
}