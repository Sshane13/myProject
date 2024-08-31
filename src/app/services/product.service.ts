import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    console.log('Making API call to get all products.');
    return this.http.get(this.apiUrl);
  }

  getProductById(id: number): Observable<any> {
    console.log(`Making API call to get product with ID: ${id}`);
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Implement other methods such as addProduct, updateProduct, deleteProduct
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
