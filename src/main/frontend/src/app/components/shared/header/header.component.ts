import { Component, OnInit } from '@angular/core';
import { HeaderService, HeaderLink} from "../../../services/header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {


  links: HeaderLink[] = [];

  constructor(private servicioHeader: HeaderService) { }

  ngOnInit() {
    this.links = this.servicioHeader.getLinks();
  }

}
