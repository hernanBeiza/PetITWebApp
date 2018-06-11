
export class EspecialistaModel { 
	
	public idespecialista?: number;
	public idespecialidad?: number;
	public rut?: string;
	public nombres?: string;
	public apellidopaterno?: string;
	public apellidomaterno?: string;
	public correo?: string;
	public direccion?: string;
	public comuna?: string;
	public valid?: number;

	constructor(idespecialista?:number,idespecialidad?:number,rut?:string,nombres?:string,paterno?:string,materno?:string,correo?:string,direccion?:string,comuna?:string,valid?:number){
		this.idespecialista = idespecialista;
		this.idespecialidad = idespecialidad;
		this.rut = rut;
		this.nombres = nombres;
		this.apellidopaterno = paterno;
		this.apellidomaterno = materno;
		this.correo = correo;
		this.direccion = direccion;
		this.comuna = comuna;
		this.valid = valid;
	}
	
}
