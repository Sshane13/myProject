import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule, HttpClientModule] // Include HttpClientModule here
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.loadProducts();
  }

  loadProducts(): void {
    console.log('Fetching products...');
    this.http.get('https://fakestoreapi.com/products')
      .subscribe({
        next: data => {
          console.log('Products data:', data);
          this.products = data as any[];
        },
        error: error => {
          this.errorMessage = 'Failed to load products.';
          console.error('Http error:', error);
        }
      });
  }
}
