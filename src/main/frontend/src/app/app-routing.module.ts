import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RecursosHumanosComponent} from "./components/recursos-humanos/recursos-humanos.component";
import {InformaticaComponent} from "./components/informatica/informatica.component";
import {UsuariosComponent} from "./usuarios/usuarios.component";
import {FormComponent} from "./usuarios/form.component";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./usuarios/login.component";
import {AuthGuard} from "./usuarios/guards/auth.guard";
import {RoleGuard} from "./usuarios/guards/role.guard";

// import {TokenInterceptor } from "./usuarios/interceptors/token.interceptor";


const APP_ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'recursos_humanos', component: RecursosHumanosComponent},
  {path: 'informatica', component: InformaticaComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data:{role:'ROLE_ADMIN'}},
  {path: 'usuarios/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data:{role:'ROLE_ADMIN'}},

  {path: 'login', component: LoginComponent},



  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
