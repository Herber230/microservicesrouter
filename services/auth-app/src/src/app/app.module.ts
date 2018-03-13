
//Angular Base Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular Module Dependencies
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Root Module Imports
import { AppComponent } from './app.component';

//Feature Module Imports
import { AppRoutingModule } from './app-routing.module';
import { CoreModule  } from "./core-module/core.module";
import { MainModule } from './main-module/main.module';
import { FrontSession } from './core-module/services/front-session.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //Dependencies
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,

    //Features
    CoreModule.forRoot({ devMode: true }),
    MainModule,
    AppRoutingModule
  ],
  exports: [
    ],  
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
