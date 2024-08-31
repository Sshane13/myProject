import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'add-product', component: ProductFormComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' } // Handle undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
