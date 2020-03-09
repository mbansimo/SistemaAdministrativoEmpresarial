import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/shared/body/body.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './services/services.component';
import {HeaderService} from "./services/header.service";
import { RecursosHumanosComponent } from './components/recursos-humanos/recursos-humanos.component';
import { InformaticaComponent } from './components/informatica/informatica.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ServicesComponent,
    RecursosHumanosComponent,
    InformaticaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [
    HeaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
