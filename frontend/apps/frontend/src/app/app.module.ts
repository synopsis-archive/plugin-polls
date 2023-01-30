import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FeatureEagerModule } from './feature-eager/feature-eager.module';
import { SharedModule } from './shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BASE_PATH, Configuration} from "./polls-backend";
import {environment} from "../environments/environment";

const config = new Configuration();

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FeatureEagerModule,
    MatButtonModule,
    AppRoutingModule
  ],
  // use environment.backend as reference to the backend URL
  providers: [
    { provide: BASE_PATH, useValue: environment.backend },
    { provide: Configuration, useValue: config }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
