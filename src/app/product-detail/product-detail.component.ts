// product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [CommonModule] // Remove HttpClientModule here
})
export class ProductDetailComponent implements OnInit {
  product: any;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (productId) {
      this.fetchProductDetails(productId);
    } else {
      this.errorMessage = 'Invalid product ID.';
    }
  }

  fetchProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => (this.product = product),
      error: (error) => {
        this.errorMessage = 'Failed to load product details.';
        console.error('Error fetching product:', error);
      },
    });
  }
}
