import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private categoriesUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    console.log('Making API call to get all products.');
    return this.http.get(this.apiUrl);
  }
  getProductById(id: number): Observable<any> {
    console.log(`Making API call to get product with ID: ${id}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
 

  getLimitedProducts(limit: number): Observable<any> {
    console.log(`Making API call to get the top ${limit} products.`);
    return this.http.get(`${this.apiUrl}?_limit=${limit}`);
  }

  getSortedProducts(sortField: string, sortOrder: 'asc' | 'desc'): Observable<any> {
    console.log(`Making API call to get products sorted by ${sortField} in ${sortOrder} order.`);
    return this.http.get(`${this.apiUrl}?_sort=${sortField}&_order=${sortOrder}`);
  }

  getAllCategories(): Observable<any> {
    console.log('Making API call to get all categories.');
    return this.http.get(this.categoriesUrl);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    console.log(`Making API call to get products in category with ID: ${categoryId}`);
    return this.http.get(`${this.apiUrl}?categoryId=${categoryId}`);
  }

  addProduct(product: any): Observable<any> {
    console.log('Making API call to add a new product.');
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    console.log(`Making API call to update product with ID: ${id}`);
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    console.log(`Making API call to delete product with ID: ${id}`);
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
