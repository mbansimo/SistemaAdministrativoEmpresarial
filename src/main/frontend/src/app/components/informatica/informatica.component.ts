import { Component, OnInit } from '@angular/core';
import {INFORMATICA} from "./informatica.json";
import {from} from "rxjs";
import {Informatica} from "./informatica";

@Component({
  selector: 'app-informatica',
  templateUrl: './informatica.component.html',
  styleUrls: ['./informatica.component.css']
})
export class InformaticaComponent implements OnInit{
  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];

  informatica: Informatica[];

  habilitar: boolean = true;

  constructor() { }
  ngOnInit(){
    this.informatica = INFORMATICA;
}

  setHabilitar(): void {
    this.habilitar = (this.habilitar == true) ? false : true;
  }
}
