import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      image: [''],
      category: ['']
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe((response: any) => {
        console.log('Product added:', response);
        // Optionally reset the form or provide user feedback
        this.productForm.reset();
      });
    }
  }
}
