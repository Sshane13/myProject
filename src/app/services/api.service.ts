import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(@Inject(HttpClient) private http: HttpClient) { }

  // API methods...
}
