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

  public formErrors = Mensajes.validacionesLogin;

  constructor(private router: Router, 
    private LocalDBService:LocalDBService, private UsuarioLocalDBService: UsuarioLocalDBService,
    private RutValidator: RutValidator,
    private fb:FormBuilder,
    private MzToastService: MzToastService) { }

  ngOnInit(): void { 
    this.loginForm = this.fb.group({
      'rut': [this.usuarioModel.rut, Validators.compose([Validators.required,Validators.maxLength(12)])],
      'contrasena': [this.usuarioModel.password, Validators.compose([Validators.required, Validators.minLength(7)])],
    });

    this.rut = this.loginForm.controls['rut'];
    this.contrasena = this.loginForm.controls['contrasena'];
  }

  public onSubmit(values:Object):void {
    if (this.loginForm.valid) {
      this.iniciarSesion();
    } else {
      this.MzToastService.show("¡Error! Revisa tus datos de acceso",4000);
    }
  }

  private iniciarSesion(): void {
    this.UsuarioLocalDBService.iniciarSesion(this.usuarioModel).then((data:any) => {
      console.log(data);
      if(data.result){
        //Guardar en la DB Local
        let usuario:UsuarioModel = data.usuario;
        this.UsuarioLocalDBService.guardarLocal(usuario);        
        this.MzToastService.show(data.mensajes,4000,'green');
        var ruta = "";
        switch (usuario.idrol) {
          case 1:
            //console.log("admin");
            ruta = 'admin/inicio';
            this.router.navigate([ruta]);                      
            break;
          case 2:
            //console.log("recepcionista")
            ruta = 'recepcionista/inicio';
            this.router.navigate([ruta]);                      
            break;
          case 3:
            //console.log("dueno")
            ruta = 'dueno/inicio';
            this.router.navigate([ruta]);                      
            break;                  
          default:
            this.MzToastService.show("Hubo un error al intentar de identificar el usuario. Intenta más tarde",5000,'red');
            break;
        }
      } else {
        console.error(data.errores);
        this.MzToastService.show(data.errores,4000,'red');
      }
    },(dataError)=>{
      console.error(dataError);
      this.MzToastService.show(dataError.errores,4000,'red');
    });
  }

  public irRecuperar():void {
    this.router.navigate(["recuperar"]);
  }
  
  ngOnDestroy() {
    console.info("ngOnDestroy();");
  }


}
