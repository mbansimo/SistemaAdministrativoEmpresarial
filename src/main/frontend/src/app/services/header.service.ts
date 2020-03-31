import {Injectable} from "@angular/core";

@Injectable()
export class HeaderService {

  //Servicios de header links

  private header: HeaderLink[] = [
    {
      nombre: 'Home',
      linkRef: 'home',
      icon: 'fas fa-home'
    },
    {
      nombre: 'Recursos Humanos',
      linkRef: 'recursos_humanos',
      icon: 'far fa-id-card'
    }, {
      nombre: 'Informatica',
      linkRef: 'informatica',
      icon: 'fas fa-laptop-code'
    }, {
      nombre: 'Compras',
      linkRef: 'compras',
      icon: 'fas fa-cart-arrow-down'
    }, {
      nombre: 'Almacen',
      linkRef: 'almacen',
      icon: 'fas fa-boxes'
    }, {
      nombre: 'Ticket`s',
      linkRef: 'tickets',
      icon: 'fas fa-ticket-alt'
    }, {
      nombre: 'Ventas',
      linkRef: 'ventas',
      icon: 'fas fa-box-open'
    }, {
      nombre: 'Marketing',
      linkRef: 'marketing',
      icon: 'fas fa-file-video'
    }
    // ,
    // {
    //   nombre: 'Usuarios',
    //   linkRef: 'usuarios',
    //   icon: 'fas fa-user-lock'
    // }
  ];


  constructor() {
    // console.log('entro al Servicios funcionando !!!')
  }

  getLinks(): HeaderLink[] {
    return this.header;
  }

  getLink(index: string) {
    return this.header[index];
  }

}

export interface HeaderLink {
  nombre: string;
  linkRef: string;
  icon: string;
}
