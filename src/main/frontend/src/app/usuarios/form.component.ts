import {Component, OnInit} from '@angular/core';
import {Usuario} from "./usuario";
import {UsuarioService} from "../services/usuario.service";
import {Router, ActivatedRoute} from "@angular/router";
import swal from 'sweetalert2'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private usuario: Usuario = new Usuario();
  private titulo: string = "Crear Usuario";


  constructor(private usuarioService: UsuarioService,
              private router: Router, private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.cargarUsuario()
  }

  cargarUsuario(): void {
    this.activatedRouter.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.usuarioService.getUsuario(id).subscribe((usua) => this.usuario = usua)
      }
    })
  }

  update(): void {
    this.usuarioService.update(this.usuario).subscribe(
      usuario => {
        this.router.navigate(['/usuarios'])
        swal.fire('Usuario Actualizado', `Usuario ${this.usuario.cvl_usuario} actualizado con exito!`, 'success')
      })
  }

  create(): void {
    this.usuarioService.create(this.usuario).subscribe(
      response => {
        this.router.navigate(['/usuarios'])
        swal.fire('Nuevo Usuario', `Usuario ${this.usuario.cvl_usuario} creado con exito!`, 'success')
      }
    );
  }




}
