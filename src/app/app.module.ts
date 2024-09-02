import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import {  provideHttpClient, withFetch } from '@angular/common/http';
@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add HttpClientModule here
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    
    
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
