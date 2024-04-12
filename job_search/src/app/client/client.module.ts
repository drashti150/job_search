import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    // Your components, directives, and pipes
  ],
  imports: [
    BrowserModule,
    HttpClientModule // Add HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ClientModule { }
