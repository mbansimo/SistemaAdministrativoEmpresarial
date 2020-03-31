import {Component, OnInit} from '@angular/core';
import {Usuario, Usuariologin} from "./usuario";
import swal from 'sweetalert2';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor Sign In !';
  usuario: Usuariologin;

  constructor( private authService: AuthService, private router: Router) {
    this.usuario = new Usuariologin();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()){
      swal.fire('Login', `Hola ${this.authService.usuario.username} ya estas autenticado!`, 'info');
      this.router.navigate(['/home']);
    }

  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null && this.usuario.password == null) {
      swal.fire('Error Login ', 'Username  y Password Vacias!', 'error');
      return;
    }
    if (this.usuario.username == null) {
      swal.fire('Error Login ', 'Username Vacia!', 'error');
      return;
    }
    if (this.usuario.password == null) {
      swal.fire('Error Login ', 'Password Vacia!', 'error');
      return;
    }
    console.log(this.authService);

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/home']);
      swal.fire('Login', `Hola Bienvenido ${usuario.username}, has iniciado sesión con exito!`, 'success');
    }, err => {
       if (err.status == 400){
         swal.fire('Error Login ', 'Usuario o Password Incorrecta!', 'error');
       }
    });
  }

}
