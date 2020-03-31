import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from "@angular/common";
import localeES from '@angular/common/locales/es'

import {APP_ROUTING} from './app-routing.module';
import {AppComponent} from './app.component';
import {BodyComponent} from './components/shared/body/body.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {ServicesComponent} from './services/services.component';
import {HeaderService} from "./services/header.service";
import {RecursosHumanosComponent} from './components/recursos-humanos/recursos-humanos.component';
import {InformaticaComponent} from './components/informatica/informatica.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {UsuariosComponent} from './usuarios/usuarios.component';
import {UsuarioService} from "./services/usuario.service";
import {FormComponent} from './usuarios/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './usuarios/login.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PaginatorComponent} from './components/paginator/paginator.component';
import {MatMomentDateModule} from "@angular/material-moment-adapter";


// import {TokenInterceptor} from "./usuarios/interceptors/token.interceptor";

registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ServicesComponent,
    RecursosHumanosComponent,
    InformaticaComponent,
    UsuariosComponent,
    FormComponent,
    LoginComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    APP_ROUTING,
    BrowserAnimationsModule,  MatMomentDateModule,
    ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule
  ],
  providers: [
    HeaderService,
    UsuarioService,
    {provide: LOCALE_ID, useValue: 'es'}
    // {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
