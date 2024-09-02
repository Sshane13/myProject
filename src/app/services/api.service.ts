import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Provides the service at the root level
})
export class ApiService {


  private apiUrl = 'https://fakestoreapi.com';
  private uploadUrl = 'http://localhost/upload/upload.php';
  constructor(private http: HttpClient) { }

  // Method to fetch products with optional limit
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }
  addProductToLocalBackend(product: any): Observable<any> {
    return this.http.post<any>('http://localhost/local-api/products', product);
  }

 // api.service.ts
uploadImage(image: FormData): Observable<any> {
  return this.http.post<any>('http://localhost/upload/upload.php', image);
}

  
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products`, product);
  }
  
  // Method to fetch categories
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  }
 
  // Update an existing product (PUT request)
  updateProduct(productId: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/products/${productId}`, product);
  }

  // Delete a product (DELETE request)
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/${productId}`);
  }
}
