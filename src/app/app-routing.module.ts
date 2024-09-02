import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: 'products',  component: ProductDetailComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: '', component: ProductDetailComponent },
  { path: '**', component: ProductDetailComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
