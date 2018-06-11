import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Mensajes } from './../../libs/Mensajes';
import { Validaciones } from './../../libs/Validaciones';

import { UsuarioModel } from './../../models/UsuarioModel';

import { LocalDBService } from './../../services/LocalDB.service';
import { UsuarioLocalDBService } from './../../services/UsuarioLocalDB.service';

import { MzToastService } from 'ng2-materialize';

import { RutValidator } from 'ng2-rut';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup;
  public rut:AbstractControl;
  public contrasena:AbstractControl;

  public enviandoFlag:boolean = false;

  public usuarioModel:UsuarioModel = new UsuarioModel();

  // Errores
  /*
  public formErrors = {
    'rut': '',
    'contrasena': ''
  };
  */
  public formErrors = Mensajes.validacionesLogin;

  constructor(private router: Router, 
    private LocalDBService:LocalDBService, private UsuarioLocalDBService: UsuarioLocalDBService,
    private RutValidator: RutValidator,
    private fb:FormBuilder,
    private MzToastService: MzToastService) { }

  ngOnInit(): void { 
    this.loginForm = this.fb.group({
      'rut': [this.usuarioModel.rut, Validators.compose([Validators.required])],
      'contrasena': [this.usuarioModel.password, Validators.compose([Validators.required, Validators.minLength(7)])],
    });

    this.rut = this.loginForm.controls['rut'];
    this.contrasena = this.loginForm.controls['contrasena'];

    //this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
    //this.onValueChanged(); // (re)set validation messages now

  }

  public onSubmit(values:Object):void {

    if (this.loginForm.valid) {
      console.log(this.usuarioModel);
      this.iniciarSesion();
    } else {
      this.MzToastService.show("¡Error! Revisa tus datos de acceso",3000);
    }

  }

  private iniciarSesion(): void {
    this.UsuarioLocalDBService.iniciarSesion(this.usuarioModel.rut,this.usuarioModel.password)
    .then((data:any) => {
      console.log(data);
      this.MzToastService.show(data.mensajes,3000,'green');
      var model:UsuarioModel = data.usuario as UsuarioModel;
      //Guardar en la DB Local
      this.UsuarioLocalDBService.guardarLocal(model);
      //
      var ruta = "";
      switch (model.idrol) {
        case 1:
          console.log("admin");
          ruta = 'admin/inicio';
          this.router.navigate([ruta]);                      
          break;
        case 2:
          console.log("recepcionista")
          ruta = 'recepcionista/inicio';
          this.router.navigate([ruta]);                      
          break;        
        default:
          console.log("dueno")
          ruta = 'dueno/inicio';
          this.router.navigate([ruta]);                      
          break;
      } 
      console.log(ruta);
    },(dataError)=>{
      console.warn(dataError);
      console.log(this);
      this.MzToastService.show(dataError.errores,3000,'red');
    });
  }

  private onValueChanged(data?: any) {
    this.formErrors = Validaciones.onValueChanged(data,this.loginForm,this.formErrors,Mensajes.validacionesLogin);    
  }

  ngOnDestroy() {
    console.info("LoginComponent: ngOnDestroy();");
  }


}
