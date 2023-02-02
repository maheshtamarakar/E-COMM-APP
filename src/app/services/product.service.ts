import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, productUpdated } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = "http://localhost:3000/products";
  productUpdate: productUpdated = {
    'updateProductMessage': undefined
  }

  constructor(private http:HttpClient) { }
  
  addProduct(data: Product){
    return this.http.post(this.url, data)
  }

  productList(): Observable<any>{
    return this.http.get<Product[]>(this.url)
  }

  prodDelete(id: number): Observable<any>{
    return this.http.delete(this.url + `/${id}`)
  }

  getProduct(id: string): Observable<Product>{
    return this.http.get<Product>(this.url + `/${id}`)
  }

  updateProduct(product: Product, id: string | null): Observable<Product>{
    return this.http.put<Product>(this.url + `/${id}`, product)
  }

  popularProduct(): Observable<any>{
    return this.http.get<Product[]>(this.url + '?_limit=3')
  }

  trendyProduct(): Observable<any>{
    return this.http.get<Product[]>(this.url + '?_limit=8')
  }

  searchProduct(query: string): Observable<any>{
    return this.http.get<Product[]>(this.url + `?q=${query}`)
  }
}
