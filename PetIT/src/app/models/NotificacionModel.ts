export class NotificacionModel { 
	
	public idnotificacion?: number;
	public titulo?: string;
	public mensaje?: string;
	public valid?: number;	

	constructor(idnotificacion?:number, titulo?:string, mensaje?:string,valid?:number){
		this.idnotificacion = idnotificacion;
		this.titulo = titulo;
		this.mensaje = mensaje;
		this.valid = valid;
	}
	
}