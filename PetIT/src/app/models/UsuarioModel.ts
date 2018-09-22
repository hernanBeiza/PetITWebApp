export class UsuarioModel { 
	
	public idusuario?: number;
	public idrol?: number;
	public rut?: string;
	public password?: string;
	public passwordConfirmar?: string;
	public nombre?: string;
	public valid?: number;	

	constructor(idusuario?:number,idusuariorol?:number,nombre?:string,user?:string,pass?:string,valid?:number){
		this.idusuario = idusuario;
		this.idrol = idusuariorol;
		this.nombre = nombre;
		this.rut = user;
		this.password = pass;
		this.valid = valid;
	}
	
}