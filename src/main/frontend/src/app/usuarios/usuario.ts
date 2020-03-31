export class Usuario {

  idUsuario: number;
  cvl_usuario: string;
  password: string;
  estatus: number;
  idTipo: number;
}


export class Usuariologin {
  idUsuario: number;
  // cvl_usuario: string;
  username:string;
  password: string;
  estatus: number;
  idTipo: number;
  roles: string[] = [];

}
