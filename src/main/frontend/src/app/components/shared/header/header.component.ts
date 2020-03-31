import { Component, OnInit } from '@angular/core';
import { HeaderService, HeaderLink} from "../../../services/header.service";
import {AuthService} from "../../../usuarios/auth.service";
import {Router} from "@angular/router";
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {


  links: HeaderLink[] = [];

  constructor(private servicioHeader: HeaderService, private authService:AuthService, private router:Router) { }

  logout():void{
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout' , `Hola ${username}, has cerrado sesión con exito! `, 'success');
    this.router.navigate(['/login']);
}

  ngOnInit() {
    this.links = this.servicioHeader.getLinks();
  }

}
