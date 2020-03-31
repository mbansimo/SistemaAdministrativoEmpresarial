import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usuario, Usuariologin} from "./usuario";

import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuariologin;
  private _token: string;

  constructor(private http: HttpClient) {
  }

  public get usuario(): Usuariologin {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuariologin;
      return this._usuario;
    }
    return new Usuariologin();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuariologin: Usuariologin): Observable<any> {
    const urlEnpoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    console.log("URL................");
    console.log("Ingr esa los parametros");

    params.set('grant_type', 'password');
    params.set('username', usuariologin.username);
    params.set('password', usuariologin.password);

    console.log("Esto lleva los parametros:....");
    console.log(params.toString());


    return this.http.post<any>(urlEnpoint, params.toString(), {headers: httpHeaders});
  }


  guardarUsuario(accessToken: string): void {

    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuariologin();
    this._usuario.username = payload.user_name;
    this._usuario.estatus = payload.Estatus;
    this._usuario.idTipo = payload.Tipo;
    // this._usuario.idUsuario = payload.nombredeusuario;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));

  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role:string): boolean{
    if (this.usuario.roles.includes(role)){
      return true
    }
    return false;
  }


  logout():void{
    this._token = null;
    this._usuario = null;
    // sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');

  }

}
