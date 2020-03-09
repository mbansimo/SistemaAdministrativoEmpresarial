import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RecursosHumanosComponent} from "./components/recursos-humanos/recursos-humanos.component";
import {InformaticaComponent} from "./components/informatica/informatica.component";

const APP_ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'recursos_humanos', component: RecursosHumanosComponent},
  {path: 'informatica', component: InformaticaComponent},

  {path:'**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
