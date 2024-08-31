import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Redirect to products page
  { path: 'products', component: ProductListComponent }, // Route for product list
  { path: 'product/:id', component: ProductDetailComponent }, // Route for product detail
  { path: '**', redirectTo: '/products' } // Redirect unknown paths to products
];
