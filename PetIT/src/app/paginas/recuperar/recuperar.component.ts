import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Mensajes } from './../../libs/Mensajes';
import { Validaciones } from './../../libs/Validaciones';

import { UsuarioModel } from './../../models/UsuarioModel';

import { LocalDBService } from './../../services/LocalDB.service';
import { UsuarioLocalDBService } from './../../services/UsuarioLocalDB.service';

import { MzToastService } from 'ngx-materialize';

import { RutValidator } from 'ng2-rut';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  public recuperarForm:FormGroup;
  public rut:AbstractControl;

  public enviandoFlag:boolean = false;

  public usuarioModel:UsuarioModel = new UsuarioModel();

  public formErrors = Mensajes.validacionesLogin;

  constructor(private router: Router, 
    private LocalDBService:LocalDBService, private UsuarioLocalDBService: UsuarioLocalDBService,
    private RutValidator: RutValidator,
    private fb:FormBuilder,
    private MzToastService: MzToastService) { }

  ngOnInit(): void { 
    this.recuperarForm = this.fb.group({
      'rut': [this.usuarioModel.rut, Validators.compose([Validators.required,Validators.maxLength(12)])]
    });

    this.rut = this.recuperarForm.controls['rut'];
  }

  public onSubmit(values:Object):void {
    if (this.recuperarForm.valid) {
      this.recuperar();
    } else {
      this.MzToastService.show("¡Error! Revisa tus datos de acceso",4000);
    }
  }

  private recuperar(): void {
    this.UsuarioLocalDBService.recuperarContrasena(this.usuarioModel).then((data:any) => {
      console.log(data);
      if(data.result){
        this.MzToastService.show(data.mensajes,4000,'green');
      } else {
        console.error(data.errores);
        this.MzToastService.show(data.errores,4000,'red');
      }
    },(dataError)=>{
      console.error(dataError);
      this.MzToastService.show(dataError.errores,4000,'red');
    });
  }

  ngOnDestroy() {
    //console.info("ngOnDestroy();");
  }


}
