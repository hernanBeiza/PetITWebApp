import { MascotaModel } from './MascotaModel';

export class DuenoMascotaModel { 
	
	public rutdueno?: string;
	public idusuario?: number;
	public nombres?: string
	public apellidopaterno?: string
	public apellidomaterno?: string
	public comuna?: string
	public direccion?: string;
	public telefono?: string;
	public correo?: string;
	public valid?: number;

	//Para enviar notificación
	public seleccionado?:boolean = false;

	public mascotas:Array<MascotaModel> = new Array<MascotaModel>();
	
	constructor(rut?:string,idusuario?:number,
		nombres?:string,apellidopaterno?:string,apellidomaterno?:string,
		comuna?:string,direccion?:string,telefono?:string,correo?:string,valid?:number){
		this.rutdueno = rut;
		this.idusuario = idusuario;
		this.nombres = nombres;
		this.apellidopaterno = apellidopaterno;
		this.apellidomaterno = apellidomaterno;
		this.comuna = comuna;
		this.direccion = direccion;
		this.telefono = telefono;
		this.correo = correo;
		this.valid = valid;
	}
	
}