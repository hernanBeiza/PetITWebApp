import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { MzModalComponent,MzToastService } from 'ng2-materialize';

import {DuenoLocalDBService} from './../../../../services/DuenoLocalDB.service';
import {EspecialidadLocalDBService} from './../../../../services/EspecialidadLocalDB.service';
import {CitaLocalDBService} from './../../../../services/CitaLocalDB.service';

import {EspecialidadModel} from './../../../../models/EspecialidadModel';
import {EspecialistaModel} from './../../../../models/EspecialistaModel';
import {FechaModel} from './../../../../models/FechaModel';
import {HoraModel} from './../../../../models/HoraModel';

import {CitaModel} from './../../../../models/CitaModel';


import { Mensajes } from './../../../../libs/Mensajes';
import { Validaciones } from './../../../../libs/Validaciones';

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

  @ViewChild('bottomSheetModal') bottomSheetModal: MzModalComponent;
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
  //Modelos para guardar datos seleccionados por el usuario
  public especialidadModel:EspecialidadModel;//= new EspecialidadModel();
  public especialistaModel:EspecialistaModel;// = new EspecialistaModel();
  public fechaModel:FechaModel;// = new FechaModel();
  public horaModel:HoraModel;// = new HoraModel();
  //Cita
  public citaModel:CitaModel = new CitaModel();

  constructor(private router:Router, private fb:FormBuilder,
    private MzToastService:MzToastService,
    private DuenoLocalDBService:DuenoLocalDBService,
    private EspecialidadLocalDBService:EspecialidadLocalDBService,
    private CitaLocalDBService:CitaLocalDBService) { }

  ngOnInit(): void { 
    console.log("AgendarComponent");
    this.agendarForm = this.fb.group({
      'especialidad': [this.citaModel.especialidad, Validators.compose([Validators.required])],
      'especialista': [this.citaModel.especialista, Validators.compose([Validators.required])],
      'fecha': [this.citaModel.fecha, Validators.compose([Validators.required])],
      'hora': [this.citaModel.hora, Validators.compose([Validators.required])],
    });

    this.especialidadControl = this.agendarForm.controls['especialidad'];
    this.especialistaControl = this.agendarForm.controls['especialista'];
    this.fechaControl = this.agendarForm.controls['fecha'];
    this.horaControl = this.agendarForm.controls['hora'];

    this.cargar();
  }

  public cargar():void {
    this.especialidades = this.EspecialidadLocalDBService.obtener();
  }

  public seleccionarEspecialidad(especialidad:EspecialidadModel):void {
    console.log(especialidad);
  }

  public volver():void {
    console.log("volver");
    this.router.navigate(['/recepcionista/horas/buscar']);
  }

  public onSubmit(values:Object):void {
    if (this.agendarForm.valid) {
      this.reservar();
    } else {
      this.MzToastService.show("Revisa los datos de tu agendamiento",5000);
    }
  }

  public reservar():void {
  	console.log("reservar");
    
    var enviar:boolean = true;
    this.errores = "Faltó seleccionar:";
    if(!this.especialidadModel.idespecialidad){
      enviar = false;
      this.errores+="<br>Especialidad";
    }
    if(!this.especialistaModel.idespecialista){
      enviar = false;
      this.errores+="<br>Especialista";
    }
    if(!this.fechaModel.idfecha){
      enviar = false;
      this.errores+="<br>Fecha";
    }
    if(!this.horaModel.idhora){
      enviar = false;
      this.errores+="<br>Hora";
    }

    console.log(this.especialidadModel,this.especialistaModel,this.fechaModel,this.horaModel);

    if(enviar){
      console.log(this.especialidadModel,this.especialistaModel,this.fechaModel,this.horaModel);

      let dueno = this.DuenoLocalDBService.obtenerSeleccionado();
      console.log(dueno);

      this.citaModel = new CitaModel(dueno,dueno.mascota,this.especialidadModel,
      this.especialistaModel,this.fechaModel,this.horaModel);
      console.log(this.citaModel);

      this.bottomSheetModal.open();
    } else {
      this.errorSheetModal.open();
    }

  }

  public agendarHora(): void {
    console.log("agendarHora");

    this.CitaLocalDBService.guardar(this.citaModel);

    this.bottomSheetModal.close();
    this.MzToastService.show('¡Hora agendada correctamente!', 4000, 'green');
    
    this.router.navigate(['/recepcionista/horas/finalizar']);
  }

}
