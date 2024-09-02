import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service'; // Ensure the path is correct

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  sortedProducts: any[] = [];
  categories!: string[];
  selectedCategory: any;
  errorMessage: string = '';
 

  constructor(private apiService: ApiService) {} // Inject ApiService

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (data: any) => {
        console.log('Products data:', data);
        this.products = data;
        this.sortedProducts = [...this.products];
      },
      error: error => {
        this.errorMessage = 'Failed to load products.';
        console.error('Http error:', error);
      }
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (categories: string[]) => {
        console.log('Categories data:', categories);
        this.categories = categories;
      },
      error: error => {
        this.errorMessage = 'Failed to load categories.';
        console.error('Http error:', error);
      }
    });
  }

  sortByPrice(): void {
    this.sortedProducts = [...this.products].sort((a, b) => a.price - b.price);
  }

  sortByRating(): void {
    this.sortedProducts = [...this.products].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
  }

  filterByCategory(): void {
    this.sortedProducts = this.products.filter(product =>
      product.category === this.selectedCategory
    );
  }
}
