import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MzModalComponent,MzToastService } from 'ng2-materialize';

import {Mensajes} from './../../../libs/Mensajes';
import {Validaciones} from './../../../libs/Validaciones';

// Services
import {UsuarioLocalDBService} from './../../../services/UsuarioLocalDB.service';
import {DuenoMascotaLocalDBService} from './../../../services/DuenoMascotaLocalDB.service';
import {EspecialidadLocalDBService} from './../../../services/EspecialidadLocalDB.service';
import {EspecialistaLocalDBService} from './../../../services/EspecialistaLocalDB.service';
import {HoraLocalDBService} from './../../../services/HoraLocalDB.service';
import {CitaLocalDBService} from './../../../services/CitaLocalDB.service';
// Models
import {UsuarioModel} from './../../../models/UsuarioModel';
import {DuenoMascotaModel} from './../../../models/DuenoMascotaModel';
import {MascotaModel} from './../../../models/MascotaModel';
import {EspecialidadModel} from './../../../models/EspecialidadModel';
import {EspecialistaModel} from './../../../models/EspecialistaModel';
import {HoraModel} from './../../../models/HoraModel';
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
  public horas:Array<HoraModel> = new Array<HoraModel>();
  
  public fecha:string = "";

  public especialidadModel:EspecialidadModel = new EspecialidadModel();
  public especialistaModel:EspecialistaModel = new EspecialistaModel();
  public citaModel:CitaModel = new CitaModel();

  public opcionesCalendario: Pickadate.DateOptions = {
    format: 'dd-mm-yyyy',
    formatSubmit: 'yyyy-mm-dd',
    min: new Date(),
    today: 'Hoy',
    clear: 'Limpiar',
    close: 'OK',
    onClose: () => this.cargarHoras()
  };

  public opcionesReloj: Pickadate.TimeOptions = {
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Limpiar', // text for clear-button
    canceltext: 'Cancelar', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
  };

  constructor(private router:Router, private fb:FormBuilder, private activatedRoute: ActivatedRoute, 
    private UsuarioLocalDBService:UsuarioLocalDBService,
    private MzToastService:MzToastService,
    private DuenoMascotaLocalDBService:DuenoMascotaLocalDBService,
    private EspecialidadLocalDBService:EspecialidadLocalDBService,
    private EspecialistaLocalDBService:EspecialistaLocalDBService,
    private HoraLocalDBService:HoraLocalDBService,
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
    this.horas = new Array<HoraModel>();    
    this.cargarEspecialistas();
  }

  public seleccionarEspecialista(event):void {    
    console.info("seleccionarEspecialista");
    this.citaModel.idespecialista = this.especialistaModel.idespecialista;
    this.citaModel.especialistaModel = this.especialistaModel;
    this.fechaControl.reset();
    this.horas = new Array<HoraModel>();    
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

  private cargarHoras():void {
    console.info("cargarHoras();");
    this.HoraLocalDBService.obtenerConEspecialistayFecha(this.especialistaModel,this.fecha).then((data:any)=>{
      console.info(data);
      if(data.result){
        this.horas = data.horas;
        this.MzToastService.show(data.mensajes, 4000, 'green');
      }
    },(dataError:any)=>{
      console.warn(dataError);  
      this.MzToastService.show(dataError.errores, 5000, 'red');
    });
  }

  public volver():void {
    //Dependiendo del tipo de usuario
    var ruta ="/recepcionista/horas/consultar";
    if(this.usuario.idrol!=2){
       ruta ="/dueno/horas/consultar";
    }
    this.router.navigate([ruta]);      
  }

  private reservar(hora:HoraModel): void {
    if (this.agendarForm.valid) {
      this.citaModel.especialistaModel = hora.especialistaModel;
      this.citaModel.idhora = hora.idhora;
      this.citaModel.horaModel = hora;
      this.agendarSheetModal.open();
    } else {
      this.MzToastService.show("Revisa los datos de tu agendamiento",5000);
    }
  }
  
  public onSubmit(values:Object):void {
    console.warn("Ya no debería usarse");
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
    if(!this.citaModel.idespecialista){
      enviar = false;
      this.errores+="<br>Especialista";
    }
    if(!this.fecha){
      enviar = false;
      this.errores+="<br>Fecha";
    }
    if(!this.citaModel.horaModel){
      enviar = false;
      this.errores+="<br>Hora";
    }
    if(enviar){
      this.enviar();
    } else {
      this.errorSheetModal.open();
    }
  }

  private enviar(): void {
    console.info("enviar");
    this.CitaLocalDBService.guardar(this.citaModel).then((data:any)=>{
      console.info(data);
      if(data.result){          
        this.agendarSheetModal.close();
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

}