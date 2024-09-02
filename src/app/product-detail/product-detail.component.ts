import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { Product } from '../product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [CommonModule, HttpClientModule, RouterModule] // Include HttpClientModule here
})
export class ProductDetailComponent implements OnInit {
  product: any;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get productId from route parameters
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProductDetails(Number(productId));
    } else {
      this.errorMessage = 'Invalid product ID.';
    }
  }

  fetchProductDetails(id: number): void {
    console.log(`Fetching details for product ID: ${id}...`);
    this.http.get(`https://fakestoreapi.com/products/${id}`)
      .subscribe({
        next: product => {
          console.log('Product details data:', product);
          this.product = product;
        },
        error: error => {
          this.errorMessage = 'Failed to load product details.';
          console.error('Http error:', error);
        }
      });
  }
}
