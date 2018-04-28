import { Injectable } from '@angular/core';

import { UsuarioModel } from './../models/UsuarioModel';

@Injectable()
export class LocalDBService {

  public constUsuario:string = "DBLOCAL";

  constructor() { }
 
  public guardarUsuario(usuario:UsuarioModel):void{
    localStorage.setItem(this.constUsuario,JSON.stringify(usuario));
  }

  public obtenerUsuario():UsuarioModel {
    let usuario:UsuarioModel;
    usuario = JSON.parse(localStorage.getItem(this.constUsuario));
    return usuario;
  }

  public borrarUsuario():boolean {
    localStorage.removeItem(this.constUsuario);
    return true;
  }

  public borrarTodo():boolean {
    localStorage.clear();
    return true;
  }


}