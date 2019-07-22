import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MzModalComponent,MzToastService } from 'ngx-materialize';

import {Mensajes} from './../../../libs/Mensajes';
import {Validaciones} from './../../../libs/Validaciones';

// Services
import {UsuarioLocalDBService} from './../../../services/UsuarioLocalDB.service';
import {DuenoMascotaLocalDBService} from './../../../services/DuenoMascotaLocalDB.service';
import {EspecialidadLocalDBService} from './../../../services/EspecialidadLocalDB.service';
import {EspecialistaLocalDBService} from './../../../services/EspecialistaLocalDB.service';
import {CitaLocalDBService} from './../../../services/CitaLocalDB.service';
// Models
import {UsuarioModel} from './../../../models/UsuarioModel';
import {DuenoMascotaModel} from './../../../models/DuenoMascotaModel';
import {MascotaModel} from './../../../models/MascotaModel';
import {EspecialidadModel} from './../../../models/EspecialidadModel';
import {EspecialistaModel} from './../../../models/EspecialistaModel';
import {CitaModel} from './../../../models/CitaModel';

@Component({
  selector: 'app-horas-listar',
  templateUrl: './horas-listar.component.html',
  styleUrls: ['./horas-listar.component.css']
})
export class HorasListarComponent implements OnInit {

  public usuario:UsuarioModel;

  public enviandoFlag:boolean = false;

  @ViewChild('anularSheetModal') anularSheetModal: MzModalComponent;
  @ViewChild('errorSheetModal') errorSheetModal: MzModalComponent;

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

  private mascota:MascotaModel = new MascotaModel();
  public errores:string = ""
  //Arreglo de especialidades
  public citas:Array<CitaModel> = new Array<CitaModel>();
  
  public fecha:string = "";

  public citaModel:CitaModel = new CitaModel();

  constructor(private router:Router, private fb:FormBuilder, private activatedRoute: ActivatedRoute, 
    private UsuarioLocalDBService:UsuarioLocalDBService,
    private MzToastService:MzToastService,
    private CitaLocalDBService:CitaLocalDBService) { }

  ngOnInit(): void { 
    this.usuario = this.UsuarioLocalDBService.obtenerLocal();

    this.activatedRoute.params.subscribe((param: any) => {
      let rutmascota = param['rutmascota'];
      this.mascota.rutmascota = rutmascota;
      if(rutmascota != undefined || rutmascota == "undefined"){
        this.cargarHorasConMascota(rutmascota);
      } else {
        this.MzToastService.show("No hay rut de mascota.",5000,"red");
      }
    });
  }

  private cargarHorasConMascota(mascota:string):void {
    console.info("cargarHorasConMascota();");
    console.info(mascota);
    this.CitaLocalDBService.obtenerConRut(mascota).then((data:any)=>{
      console.info(data);
      if(data.result){
        this.citas = data.citas;
        this.MzToastService.show(data.mensajes, 4000, 'green');
      }
    },(dataError:any)=>{
      console.warn(dataError);  
      this.citas = new Array<CitaModel>();
      this.MzToastService.show(dataError.errores, 4000, 'red');
    });
  }

  public irModificar(cita:CitaModel):void {
    console.log("irModificar");
    console.log(cita);
    //Dependiendo del tipo de usuario
    var ruta ="/recepcionista/horas/modificar/"+cita.idcita;
    if(this.usuario.idrol!=2){
      ruta ="/dueno/horas/modificar/"+cita.idcita;
    }
    this.router.navigate([ruta]);
  }

  public irAnular(cita:CitaModel): void {
    //console.log("irAnular");
    //console.log(cita);
    this.citaModel = cita;
    this.anularSheetModal.openModal();
  }

  public anular(): void {
    //console.log("anular");
    this.CitaLocalDBService.anular(this.citaModel).then((data:any)=>{
      //console.log(data);
      this.anularSheetModal.closeModal();
      if(data.result){
        this.cargarHorasConMascota(this.mascota.rutmascota);
        this.MzToastService.show(data.mensajes, 4000, 'green');
      } else {
        this.MzToastService.show(data.errores, 4000, 'red');
      }
    },(dataError:any)=>{
      console.error(dataError);
      this.anularSheetModal.closeModal();
      this.MzToastService.show(dataError.errores, 4000, 'red');
    });

  }

}