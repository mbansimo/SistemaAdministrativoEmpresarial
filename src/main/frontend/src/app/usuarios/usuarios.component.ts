import {Component, OnInit} from '@angular/core';
import {Usuario} from "./usuario";
import {UsuarioService} from "../services/usuario.service";
import {Router} from "@angular/router";
import {throwError} from "rxjs";
import swal from "sweetalert2";
import {AuthService} from "./auth.service";


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService, private router: Router,
              private authService: AuthService){
  }

  private isNoAutorizado(e):boolean{
    if (e.status==401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }


  ngOnInit() {
    // if (this.isNoAutorizado(e)){
    //   return throwError(e)
    // }
    this.usuarioService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios
      }
    );
  }

  delete(usuario: Usuario): void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `Seguro que desea eliminar al usuario ${usuario.cvl_usuario }`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.usuarioService.delete(usuario.idUsuario).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(cli => cli !== usuario)
            swalWithBootstrapButtons.fire(
              'Usuario Eliminada!',
              `Usuario ${usuario.cvl_usuario} eliminado con éxito`,
              'success'
            )
          }
        )
      }
    })
  }


}
