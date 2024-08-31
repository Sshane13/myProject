import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AppRoutingModule } from './app-routing.module';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
