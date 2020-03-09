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
      icon: 'fa fa-caret-square-o-right'
    }
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
