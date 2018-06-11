import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { MzToastService } from 'ng2-materialize';

import { DuenoModel } from './../../../models/DuenoModel';
import { MascotaModel } from './../../../models/MascotaModel';
import { DuenoLocalDBService} from './../../../services/DuenoLocalDB.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public buscarForm:FormGroup;
  public stringControl:AbstractControl;
  public fieldControl:AbstractControl;

  public duenos:Array<DuenoModel> = new Array<DuenoModel>();

  public filtroString: string = ""
  public filtroField: string = "rut";

  constructor(private router:Router, 
    private fb:FormBuilder,
    private DuenoLocalDBService:DuenoLocalDBService,
    private MzToastService:MzToastService) { 
      console.log("BuscarComponent");

      this.buscarForm = this.fb.group({
        'filtroString': [this.filtroString, Validators.compose([Validators.required])],
        'filtroField': [this.filtroField, Validators.compose([Validators.required])],
      });

      this.stringControl = this.buscarForm.controls['filtroString'];
      this.fieldControl = this.buscarForm.controls['filtroField'];
      //this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
      //this.onValueChanged(); // (re)set validation messages now
  }


  ngOnInit() { }

  public onSubmit(values:Object):void {
    if (this.buscarForm.valid) {
      if(this.filtroField=="nombre"){
        this.buscarConNombre();
      } else {
        this.buscarConRut();
      }
    }
  }
  
  private buscarConNombre(): void {
    this.DuenoLocalDBService.obtenerConNombreApellido(this.filtroString).then((data:any)=>{
      console.log(data);
      if(data.result){
        this.duenos = data.duenos;
        this.MzToastService.show(data.mensajes,3000,'green');
      } else {
        this.MzToastService.show(data.errores,5000,'red');
      }
    },(dataError:any)=>{
      console.error(dataError);
      this.MzToastService.show(dataError.errores,5000,'red');
    });
  }

  private buscarConRut(): void {
    this.DuenoLocalDBService.obtenerConRut(this.filtroString).then((data:any)=>{
      console.log(data);
      if(data.result){
        this.duenos = data.duenos;
        this.MzToastService.show(data.mensajes,3000,'green');
      } else {
        this.MzToastService.show(data.errores,5000,'red');
      }
    },(dataError:any)=>{
      console.error(dataError);
      this.MzToastService.show(dataError.errores,5000,'red');
    });
  }

  public irAgendar(dueno:DuenoModel):void {
    this.router.navigate(['/recepcionista/horas/agendar/'+dueno.rutdueno+'/'+dueno.mascota.rutmascota]);
  }

}