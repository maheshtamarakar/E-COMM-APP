import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = "http://localhost:3000/products";

  constructor(private http:HttpClient) { }
  
  addProduct(data: Product){
    return this.http.post(this.url, data) 
  }

  productList(): Observable<any>{
    return this.http.get<Product[]>(this.url)
  }
}
