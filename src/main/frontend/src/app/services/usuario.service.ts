import {Injectable} from '@angular/core';
import {USUARIOS} from "../usuarios/usuarios.json";
import {Usuario} from "../usuarios/usuario";
import {of, Observable, throwError} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {map, catchError} from "rxjs/operators";
import swal from 'sweetalert2';
import {Router} from "@angular/router";
import {AuthService} from "../usuarios/auth.service";


@Injectable()
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/api/usuariosact';
  private urlEndoPointPost: string = 'http://localhost:8080/api/usuarios';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private router: Router, private authservice: AuthService) {
  }

  private agregarAuthorizationHeader() {
    let token = this.authservice.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token)
    }
    return this.httpHeaders;
  }


  private isNoAutorizado(e): boolean {
    if (e.status == 401) {

      if (this.authservice.isAuthenticated()){
        this.authservice.logout();
      }
      this.router.navigate(['/login'])
      return true;
    }
    if (e.status == 403){
      swal.fire('Acceso denegado', `Hola ${this.authservice.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/home']);
      return true;
    }



    return false;
  }


  getUsuarios(): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(this.urlEndPoint).pipe(
      map(response => response as Usuario[])
    );
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<any>(this.urlEndoPointPost, usuario, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.Mensaje) {
          console.error(e.error.Mensaje);
        }
        swal.fire(e.error.Mensaje, e.error.Error, "error");
        return throwError(e);
      })
    );
  }

  getUsuario(id): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndoPointPost}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        if (e.status != 401 && e.error.mensaje){
          this.router.navigate(['/login']);
        }
        this.router.navigate(['/usuarios']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.urlEndoPointPost}/${usuario.idUsuario}`, usuario, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.menaje);
        swal.fire(e.error.Mensaje, e.error.Error, "error");
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndoPointPost}/${id}`, {headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.menaje);
        swal.fire(e.error.Mensaje, e.error.Error, "error");
        return throwError(e);
      })
    );
  }

  // subirfoto(archivo: File, id): Observable<HttpEvent<{}>>{
  //   let formData = new FormData();
  //   formData.append("archivo", archivo);
  //   formData.append("id", id);
  //
  //   let httpHeaders = HttpHeaders();
  //   let token = this.authservice.token;
  //   if (token != null){
  //     httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
  //   }
  //
  //   const req = new HttpRequest('POST', `${this.urlEndoPointPost}/upload`, formData,{
  //     reportProgress: true,
  //     headers: httpHeaders
  //   });
  //   return this.http.request(req).pipe(
  //     catchError(e => {
  //       this.isNoAutorizado(e);
  //       return throwError(e);
  //     })
  //   );


  // }

}
