import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Provides the service at the root level
})
export class ApiService {
  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) { }

  // Method to fetch products with optional limit
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  // Method to fetch categories
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  }
}
