import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { ApiService } from '../services/api.service'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule, ReactiveFormsModule], 
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  sortedProducts: any[] = [];
  categories!: string[];
  selectedCategory: string = '';
  errorMessage: string = '';

  updatedProduct: any = {}; 
  productIdToUpdate: number | null = null; 
  selectedImage: File | null = null;
  selectedFile: any;

  addProductForm: FormGroup;
  updateProductForm: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    // Initialize the forms using FormBuilder
    this.addProductForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      image: [null]
    });

    this.updateProductForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }
  
  filterByCategory(): void {
    if (this.selectedCategory === '') {
      this.sortedProducts = [...this.products]; 
    } else {
      this.sortedProducts = this.products.filter(product =>
        product.category === this.selectedCategory
      );
    }
  }loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (data: any) => {
        console.log('Products data:', data);
        this.products = data;
        this.sortedProducts = [...this.products];
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load products.';
        console.error('Http error:', error);
      }
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (categories: string[]) => {
        this.categories = ['']; 
        this.categories.push(...categories); 
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load categories.';
        console.error('Http error:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.addProductForm.patchValue({ image: file });
  }
  addProduct(): void {
    if (this.addProductForm.valid) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile);
  
        this.apiService.uploadImage(formData).subscribe({
          next: (uploadResponse: any) => {
            if (uploadResponse.file) {
              const imageUrl = `http://localhost/upload/uploads/${uploadResponse.file}`;
              const productData = {
                ...this.addProductForm.value,
                imageUrl: imageUrl
              };
  
              this.apiService.addProduct(productData).subscribe({
                next: (data: any) => {
                  console.log('Product added:', data);
                  console.log('Current products:', this.products);

                  // Check if the response includes an id
                  if (data && data.id) {
                    this.products.push(data);
                    this.sortedProducts = [...this.products];
                    this.addProductForm.reset();
                    this.selectedFile = null;
                  } else {
                    console.error('Added product response missing id:', data);
                  }
                },
                error: (error: any) => {
                  this.errorMessage = 'Failed to add product.';
                  console.error('Http error:', error);
                }
              });
            } else {
              this.errorMessage = 'Failed to get image URL.';
            }
          },
          error: (error: any) => {
            this.errorMessage = 'Failed to upload image.';
            console.error('Http error:', error);
          }
        });
      } else {
        this.errorMessage = 'No file selected.';
      }
    }
  }
  updateProduct(): void {
    if (this.productIdToUpdate !== null && this.updateProductForm.valid) {
      const updatedData = this.updateProductForm.value;
  
      // Include the existing image URL in the update data
      const existingProduct = this.products.find(p => p.id === this.productIdToUpdate);
      if (existingProduct) {
        updatedData.imageUrl = existingProduct.imageUrl; // Preserve existing image URL
      }
  
      this.apiService.updateProduct(this.productIdToUpdate, updatedData).subscribe({
        next: (data: any) => {
          console.log('Product updated:', data);
  
          // Find and update the product in the list
          const index = this.products.findIndex(p => p.id === this.productIdToUpdate);
          if (index !== -1) {
            this.products[index] = { ...data, imageUrl: existingProduct?.imageUrl }; // Preserve the image URL
            this.sortedProducts = [...this.products];
          }
          this.closeUpdateForm(); // Close the form after updating
        },
        error: (error: any) => {
          this.errorMessage = 'Failed to update product.';
          console.error('Http error:', error);
        }
      });
    }
  }
  
  setProductForUpdate(product: any): void {
    this.productIdToUpdate = product.id;
    this.updateProductForm.patchValue({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category
    });
  }
    
  closeUpdateForm(): void {
    this.productIdToUpdate = null;
    this.updateProductForm.reset();
  }


  sortByPrice(): void {
    this.sortedProducts = [...this.products].sort((a, b) => a.price - b.price);
  }

  sortByRating(): void {
    this.sortedProducts = [...this.products].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
  }
 
  
 
  deleteProduct(productId: number): void {
    this.apiService.deleteProduct(productId).subscribe({
      next: () => {
        console.log('Product deleted:', productId);
        this.products = this.products.filter(p => p.id !== productId);
        this.sortedProducts = [...this.products];
        // Reset state to ensure UI update
        this.sortByPrice(); // or any other sorting/filtering method you use
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to delete product.';
        console.error('Http error:', error);
      }
    });
  }
  
  
  

  
  selectProductForUpdate(product: any): void {
    this.productIdToUpdate = product.id;
    this.updatedProduct = { ...product }; 
  }
}
