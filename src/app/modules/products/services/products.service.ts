import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'http://localhost:3002/book';

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get<any>(this.url);
  }
}
