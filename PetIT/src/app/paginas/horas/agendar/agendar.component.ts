import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

import {DuenoLocalDBService} from './../../../services/DuenoLocalDB.service';
import {EspecialidadLocalDBService} from './../../../services/EspecialidadLocalDB.service';
import {EspecialistaLocalDBService} from './../../../services/EspecialistaLocalDB.service';
import {CitaLocalDBService} from './../../../services/CitaLocalDB.service';

import {DuenoModel} from './../../../models/DuenoModel';
import {MascotaModel} from './../../../models/MascotaModel';
import {EspecialidadModel} from './../../../models/EspecialidadModel';
import {EspecialistaModel} from './../../../models/EspecialistaModel';
import {FechaModel} from './../../../models/FechaModel';
import {HoraModel} from './../../../models/HoraModel';

import {CitaModel} from './../../../models/CitaModel';


import { Mensajes } from './../../../libs/Mensajes';
import { Validaciones } from './../../../libs/Validaciones';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent implements OnInit {

  public agendarForm:FormGroup;
  public especialidadControl:AbstractControl;
  public especialistaControl:AbstractControl;
  public fechaControl:AbstractControl;
  public horaControl:AbstractControl;

  public enviandoFlag:boolean = false;

  @ViewChild('agendarSheetModal') agendarSheetModal: MzModalComponent;
  @ViewChild('errorSheetModal') errorSheetModal: MzModalComponent;

  // Errores
  /*
  public formErrors = {
    'rut': '',
    'contrasena': ''
  };
  */
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
  
  public duenoModel:DuenoModel;//= new EspecialidadModel();

  public hora:string;
  //Modelos para guardar datos seleccionados por el usuario
  /*
  public especialidadModel:EspecialidadModel;//= new EspecialidadModel();
  public especialistaModel:EspecialistaModel;// = new EspecialistaModel();
  public fechaModel:FechaModel;// = new FechaModel();
  public horaModel:HoraModel;// = new HoraModel();
  */
  //Cita
  public citaModel:CitaModel = new CitaModel();

  public opcionesCalendario: Pickadate.DateOptions = {
    format: 'dd-mm-yyyy',
    formatSubmit: 'dd-mm-yyyy',
    min: new Date(),
    today: 'Hoy',
    clear: 'Limpiar',
    close: 'OK'
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
    private MzToastService:MzToastService,
    private DuenoLocalDBService:DuenoLocalDBService,
    private EspecialidadLocalDBService:EspecialidadLocalDBService,
    private EspecialistaLocalDBService:EspecialistaLocalDBService,
    private CitaLocalDBService:CitaLocalDBService) { }

  ngOnInit(): void { 
    console.log("AgendarComponent");
    this.agendarForm = this.fb.group({
      'especialidad': [this.citaModel.especialidad, Validators.compose([Validators.required])],
      'especialista': [this.citaModel.especialista, Validators.compose([Validators.required])],
      'fecha': [this.citaModel.fecha, Validators.compose([Validators.required])],
      'hora': [this.hora, Validators.compose([Validators.required])],
    });

    this.especialidadControl = this.agendarForm.controls['especialidad'];
    this.especialistaControl = this.agendarForm.controls['especialista'];
    this.fechaControl = this.agendarForm.controls['fecha'];
    //this.horaControl = this.agendarForm.controls['hora'];

    this.activatedRoute.params.subscribe((param: any) => {
      let iddueno = param['iddueno'];
      let idmascota = param['idmascota'];
      if(iddueno != undefined || iddueno == "undefined" || idmascota != undefined || idmascota == "undefined"){
        this.DuenoLocalDBService.obtenerDuenoConMascota(iddueno,idmascota).then((data:any)=>{
          console.log(data);
          if(data.result){
            this.duenoModel = data.dueno;
            this.citaModel.dueno = this.duenoModel;
            this.citaModel.mascota = this.duenoModel.mascota;
          } else {
            this.MzToastService.show(data.errores,5000,"red");
          }
        },(dataError:any)=>{
            this.MzToastService.show(dataError.errores,5000,"red");
        });
      } else {
        this.MzToastService.show("No hay id de dueno.",5000,"red");
      }
    });   
    this.cargarEspecialidades();
  }

  public cargarEspecialidades():void {
    this.EspecialidadLocalDBService.obtener().then((data:any)=> {
      console.log(data);
      if(data.result){
        this.especialidades = data.especialidades;
      }
    },(dataError)=> {
      console.error(dataError);
    });
  }

  public seleccionarEspecialidad(event):void {
    console.log("seleccionarEspecialidad");
    console.log(this.citaModel.especialidad);
    this.cargarEspecialistas();
  }

  public cargarEspecialistas():void {
    this.EspecialistaLocalDBService.obtenerConEspecialidad(this.citaModel.especialidad).then((data:any)=>{
      if(data.result){
        this.especialistas = data.especialistas;
      }
    },(dataError:any)=>{
      console.error(dataError);
    });
  }

  public volver():void {
    console.log("volver");
    this.router.navigate(['/recepcionista/horas/buscar']);
  }

  public onSubmit(values:Object):void {
    if (this.agendarForm.valid) {
      this.agendarSheetModal.open();
    } else {
      this.MzToastService.show("Revisa los datos de tu agendamiento",5000);
    }
  }

  public agendar():void {
  	console.log("reservar");    
    var enviar:boolean = true;
    this.errores = "Faltó seleccionar:";
    if(!this.citaModel.dueno.iddueno){
      enviar = false;
      this.errores+="<br>Dueño";
    }
    if(!this.citaModel.mascota){
      enviar = false;
      this.errores+="<br>Mascota";
    }
    if(!this.citaModel.especialidad.idespecialidad){
      enviar = false;
      this.errores+="<br>Especialidad";
    }
    if(!this.citaModel.especialista.idespecialista){
      enviar = false;
      this.errores+="<br>Especialista";
    }
    if(!this.citaModel.fecha){
      enviar = false;
      this.errores+="<br>Fecha";
    }    
    if(!this.hora){
      enviar = false;
      this.errores+="<br>Hora";
    }


    if(enviar){
      this.citaModel.fecha+=" "+this.hora;
      console.log(this.citaModel);
      this.enviar();
    } else {
      this.errorSheetModal.open();
    }

  }

  public enviar(): void {
    console.log("enviar");
    this.CitaLocalDBService.guardar(this.citaModel).then((data:any)=>{
      console.log(data);
      if(data.result){          
        this.agendarSheetModal.close();
        this.MzToastService.show(data.mensajes, 4000, 'green');    
        this.router.navigate(['/recepcionista/horas/finalizar/'+data.cita.idcita]);
      } else {
        this.MzToastService.show(data.errores, 5000, 'red');    
      }
    },(dataError:any)=>{
      console.error(dataError);
      this.MzToastService.show(dataError.errores, 5000, 'red');    
    });
  }

}