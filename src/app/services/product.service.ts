import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, Product, productUpdated } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = "http://localhost:3000/products";
  productUpdate: productUpdated = {
    'updateProductMessage': undefined
  }

  cartData = new EventEmitter<Product[] | []>()

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
  localAddToCart(data: Product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    // if user haven't added any product in localStorage
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]))
    }else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData))
    }
    this.cartData.emit(cartData);
  }
  removeItemFromCart(productId: number){
    let cartData=localStorage.getItem('localCart')
    if(cartData){
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id)
      localStorage.setItem('localCart',JSON.stringify(items))
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: Cart){
    return this.http.post("http://localhost:3000/cart", cartData);
  }
}
