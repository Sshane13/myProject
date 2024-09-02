import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This makes the service available throughout the app
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  getProducts(limit: number = 5): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products?limit=${limit}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  }
}
