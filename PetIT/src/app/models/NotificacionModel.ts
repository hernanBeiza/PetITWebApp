export class NotificacionModel { 
	
	public idnotificacion?: number;
	public titulo?: string;
	public mensaje?: string;
	public imagen?: string;	

	public valid?: number;

	constructor(idnotificacion?:number, titulo?:string, mensaje?:string, imagen?:string, valid?:number){
		this.idnotificacion = idnotificacion;
		this.titulo = titulo;
		this.mensaje = mensaje;
		this.imagen = imagen;
		this.valid = valid;
	}
	
}