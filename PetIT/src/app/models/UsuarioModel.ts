export class UsuarioModel { 
	
	public idusuario?: number;
	public idusuariorol?: number;
	public user?: string;
	public pass?: string;
	public nombre?: string;
	public valid?: number;	

	constructor(idusuario?:number,idusuariorol?:number, user?:string,pass?:string,nombre?:string, valid?:number){
		this.idusuario = idusuario;
		this.idusuariorol = idusuariorol;
		this.user = user;
		this.pass = pass;
		this.nombre = nombre;
		this.valid = valid;
	}
	
}