import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MzModalComponent,MzToastService } from 'ngx-materialize';

import {Mensajes} from './../../../libs/Mensajes';
import {Validaciones} from './../../../libs/Validaciones';

// Services
import {UsuarioLocalDBService} from './../../../services/UsuarioLocalDB.service';
import {DuenoMascotaLocalDBService} from './../../../services/DuenoMascotaLocalDB.service';
import {EspecialistaDisponibilidadLocalDBService} from './../../../services/EspecialistaDisponibilidadLocalDB.service';
import {EspecialidadLocalDBService} from './../../../services/EspecialidadLocalDB.service';
import {EspecialistaLocalDBService} from './../../../services/EspecialistaLocalDB.service';
import {CitaLocalDBService} from './../../../services/CitaLocalDB.service';
// Models
import {UsuarioModel} from './../../../models/UsuarioModel';
import {DuenoMascotaModel} from './../../../models/DuenoMascotaModel';
import {MascotaModel} from './../../../models/MascotaModel';
import {EspecialidadModel} from './../../../models/EspecialidadModel';
import {EspecialistaDisponibilidadModel} from './../../../models/EspecialistaDisponibilidadModel';
import {EspecialistaModel} from './../../../models/EspecialistaModel';
import {CitaModel} from './../../../models/CitaModel';

@Component({
  selector: 'app-horas-agendar',
  templateUrl: './horas-agendar.component.html',
  styleUrls: ['./horas-agendar.component.css']
})
export class HorasAgendarComponent implements OnInit {

  public usuario:UsuarioModel;
  public agendarForm:FormGroup;
  public especialidadControl:AbstractControl;
  public especialistaControl:AbstractControl;
  public fechaControl:AbstractControl;

  public enviandoFlag:boolean = false;

  @ViewChild('agendarSheetModal') agendarSheetModal: MzModalComponent;
  @ViewChild('errorSheetModal') errorSheetModal: MzModalComponent;

  public formErrors = Mensajes.validacionesAgendar;

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
      //console.log('Ready');
      //console.log(modal, trigger);
    },
    complete: () => { 
      //console.log('Closed'); 
    } // Callback for Modal close
  };

  public errores:string = ""
  //Arreglo de especialidades
  public especialidades:Array<EspecialidadModel> = new Array<EspecialidadModel>();
  public especialistas:Array<EspecialistaModel> = new Array<EspecialistaModel>();
  public disponibilidades:Array<EspecialistaDisponibilidadModel> = new Array<EspecialistaDisponibilidadModel>();
  
  public fecha:string = "";

  public especialidadModel:EspecialidadModel = new EspecialidadModel();
  public especialistaModel:EspecialistaModel = new EspecialistaModel();
  public citaModel:CitaModel = new CitaModel();
  public especialistaDisponibilidadModel:EspecialistaDisponibilidadModel = new EspecialistaDisponibilidadModel();

  public opcionesCalendario: Pickadate.DateOptions = {
    format: 'dd-mm-yyyy',
    formatSubmit: 'yyyy-mm-dd',
    min: new Date(),
    today: 'Hoy',
    clear: 'Limpiar',
    close: 'OK',
    onClose: () => this.cargarDisponibilidades()
  };

  constructor(private router:Router, private fb:FormBuilder, private activatedRoute: ActivatedRoute, 
    private UsuarioLocalDBService:UsuarioLocalDBService,
    private MzToastService:MzToastService,
    private DuenoMascotaLocalDBService:DuenoMascotaLocalDBService,
    private EspecialidadLocalDBService:EspecialidadLocalDBService,
    private EspecialistaLocalDBService:EspecialistaLocalDBService,
    private EspecialistaDisponibilidadLocalDBService:EspecialistaDisponibilidadLocalDBService,
    private CitaLocalDBService:CitaLocalDBService) { }

  ngOnInit(): void { 
    console.info("AgendarComponent");
    this.usuario = this.UsuarioLocalDBService.obtenerLocal();

    this.agendarForm = this.fb.group({
      'especialidad': [this.especialidadModel, Validators.compose([Validators.required])],
      'especialista': [this.especialistaModel, Validators.compose([Validators.required])],
      'fecha': [this.fecha, Validators.compose([Validators.required])],
    });

    this.especialidadControl = this.agendarForm.controls['especialidad'];
    this.especialistaControl = this.agendarForm.controls['especialista'];
    this.fechaControl = this.agendarForm.controls['fecha'];

    this.activatedRoute.params.subscribe((param: any) => {
      let rutdueno = param['rutdueno'];
      let rutmascota = param['rutmascota'];
      if(rutdueno != undefined || rutdueno == "undefined" || rutmascota != undefined || rutmascota == "undefined"){
        this.obtenerDatos(rutdueno,rutmascota);
      } else {
        this.MzToastService.show("No hay id de dueno.",5000,"red");
      }
    });
    this.cargarEspecialidades();
  }

  private obtenerDatos(rutdueno:string,rutmascota:string): void {
    this.DuenoMascotaLocalDBService.obtenerDuenoConMascota(rutdueno,rutmascota).then((data:any)=>{
      console.info(data);
      if(data.result){
        let dueno:DuenoMascotaModel = data.dueno;
        let mascota:MascotaModel = data.dueno.mascotas[0] as MascotaModel;
        this.citaModel.duenoMascotaModel = dueno;
        this.citaModel.mascotaModel = mascota;
        this.citaModel.rutmascota = mascota.rutmascota;
      } else {
        this.MzToastService.show(data.errores,5000,"red");
      }
    },(dataError:any)=>{
      this.MzToastService.show(dataError.errores,5000,"red");
    });
  }

  private cargarEspecialidades():void {
    this.EspecialidadLocalDBService.obtener().then((data:any)=> {
      console.info(data);
      if(data.result){
        this.especialidades = data.especialidades;
      }
    },(dataError)=> {
      console.warn(dataError);
    });
  }

  public seleccionarEspecialidad(event):void {
    console.info("seleccionarEspecialidad");
    console.info(this.especialidadModel);
    this.especialistaControl.reset();
    this.fechaControl.reset();
    this.disponibilidades = new Array<EspecialistaDisponibilidadModel>();    
    this.cargarEspecialistas();
  }

  public seleccionarEspecialista(event):void {    
    console.info("seleccionarEspecialista");
    this.citaModel.especialistaModel = this.especialistaModel;
    this.fechaControl.reset();
    this.disponibilidades = new Array<EspecialistaDisponibilidadModel>();    
  }

  private cargarEspecialistas():void {
    this.EspecialistaLocalDBService.obtenerConEspecialidad(this.especialidadModel).then((data:any)=>{
      if(data.result){
        this.especialistas = data.especialistas;
      }
    },(dataError:any)=>{
      console.warn(dataError);
    });
  }

  private cargarDisponibilidades():void {
    this.EspecialistaDisponibilidadLocalDBService.obtenerConEspecialistaYFecha(this.especialistaModel,this.fecha).then((data:any)=>{
      console.info(data);
      if(data.result){
        this.disponibilidades = data.disponibilidades;
        this.MzToastService.show(data.mensajes, 4000, 'green');
      }
    },(dataError:any)=>{
      console.warn(dataError);  
    this.disponibilidades = new Array<EspecialistaDisponibilidadModel>();    
      this.MzToastService.show(dataError.errores, 5000, 'red');
    });
  }

  private reservar(especialistaDisponibilidad:EspecialistaDisponibilidadModel): void {
    if (this.agendarForm.valid) {
      this.especialistaDisponibilidadModel = especialistaDisponibilidad;
      this.citaModel.especialistaModel = this.especialistaModel;
      this.citaModel.idespecialistadisponibilidad = especialistaDisponibilidad.idespecialistadisponibilidad;
      this.citaModel.especialistaDisponibilidadModel = especialistaDisponibilidad;
      this.citaModel.origen = 1;
      this.agendarSheetModal.openModal();
    } else {
      this.MzToastService.show("Revisa los datos de tu agendamiento",5000);
    }
  }
  
  public agendar():void {
  	console.info("agendar();");
    var enviar:boolean = true;
    this.errores = "Faltó seleccionar:";
    if(!this.citaModel.duenoMascotaModel.rutdueno){
      enviar = false;
      this.errores+="<br>Dueño";
    }
    if(!this.citaModel.rutmascota){
      enviar = false;
      this.errores+="<br>Mascota";
    }
    if(!this.citaModel.especialistaModel.idespecialidad){
      enviar = false;
      this.errores+="<br>Especialidad";
    }
    if(!this.citaModel.idespecialistadisponibilidad){
      enviar = false;
      this.errores+="<br>Disponibilidad de horario";
    }
    if(!this.fecha){
      enviar = false;
      this.errores+="<br>Fecha";
    }
    if(enviar){
      this.enviar();
    } else {
      this.errorSheetModal.openModal();
    }
  }

  private enviar(): void {
    console.info("enviar");
    this.CitaLocalDBService.guardar(this.citaModel).then((data:any)=>{
      console.info(data);
      if(data.result){          
        this.agendarSheetModal.closeModal();
        this.MzToastService.show(data.mensajes, 4000, 'green'); 
        //Dependiendo del tipo de usuario
        var ruta ="/recepcionista/horas/finalizar/";
        if(this.usuario.idrol!=2){
           ruta ="/dueno/horas/finalizar/";
        }
        this.router.navigate([ruta+data.cita.idcita]);
      } else {
        this.MzToastService.show(data.errores, 5000, 'red');    
      }
    },(dataError:any)=>{
      console.warn(dataError);
      this.MzToastService.show(dataError.errores, 5000, 'red');    
    });
  }

  public onSubmit(values:any):void{

  }
  
}