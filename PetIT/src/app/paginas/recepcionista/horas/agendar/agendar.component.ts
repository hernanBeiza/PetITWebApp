import { Component, ViewChild, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent implements OnInit {

  @ViewChild('bottomSheetModal') bottomSheetModal: MzModalComponent;
  @ViewChild('errorSheetModal') errorSheetModal: MzModalComponent;

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
      console.log('Ready');
      console.log(modal, trigger);
    },
    complete: () => { 
      console.log('Closed'); 
    } // Callback for Modal close
  };

  public errores:string = ""
  //Arreglo de especialidades
  public especialidades:Array<EspecialidadModel> = new Array<EspecialidadModel>();
  //Modelos para guardar datos seleccionados por el usuario
  public especialidadModel:EspecialidadModel = new EspecialidadModel();
  public especialistaModel:EspecialistaModel = new EspecialistaModel();
  public fechaModel:FechaModel = new FechaModel();
  public horaModel:HoraModel = new HoraModel();
  //Cita
  public citaModel:CitaModel = new CitaModel();
  constructor(private router:Router, 
    private MzToastService:MzToastService,
    private DuenoLocalDBService:DuenoLocalDBService,
    private EspecialidadLocalDBService:EspecialidadLocalDBService,
    private CitaLocalDBService:CitaLocalDBService) { }

  ngOnInit() {
  	console.log("AgendarComponent");
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
