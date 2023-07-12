import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, Order, Product, productUpdated } from '../data-type';
import { environment } from 'src/environments/environment';
import { HttpService } from '../shared-service/http.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUpdate: productUpdated = {
    'updateProductMessage': undefined
  }

  domain: undefined | string;

  // All End Points
  PRODUCT: string = 'product';
  CART: string = 'cart';
  ORDERS: string = 'orders';
  ORDER: string = 'order';

  // Observables 
  removeCart$ = new BehaviorSubject<boolean>(false);
  showSideCart$ = new BehaviorSubject<boolean>(false);

  cartData = new EventEmitter<Product[] | []>()

  constructor(
    private http: HttpClient,
    private _httpService: HttpService
  ) {
    this.domain = environment.domain;
  }

  // add erro handler everywhere 

  addProduct(data: Product) {
    let sellerInfo = localStorage.getItem('seller')
    let convToObj = sellerInfo && JSON.parse(sellerInfo)[0]
    const sellerId = convToObj.seller_id
    data.seller_id = sellerId;
    const payload = JSON.stringify(data);
    //* don't forget price is integer */
    //******************* to send the post data you need httpsOptions ********************************
    return this.http.post(`${this.domain}${this.PRODUCT}`, payload, httpOptions)
  }

  productList(): Observable<any> {
    let sellerInfo = localStorage.getItem('seller')
    let convToObj = sellerInfo && JSON.parse(sellerInfo)[0]
    const sellerId = convToObj.seller_id
    return this.http.get<Product[]>(`${this.domain}${this.PRODUCT}?seller_id=${sellerId}`)
  }

  prodDelete(id: number): Observable<any> {
    return this.http.delete(`${this.domain}${this.PRODUCT}` + `/${id}`,
      httpOptions) // to get json server response
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.domain}${this.PRODUCT}` + `/${id}`)
  }

  updateProduct(product: Product, id: string | null): Observable<Product> {
    const payload = JSON.stringify(product);
    return this.http.put<Product>(`${this.domain}${this.PRODUCT}` + `/${id}`, payload, httpOptions)
  }

  popularProduct(): Observable<any> {
    const params = { limit: 3 }
    return this.http.get<Product[]>(`${this.domain}${this.PRODUCT}`, { params })
  }

  trendyProduct(): Observable<any> {
    const params = { limit: 8 }
    return this._httpService.get(this.PRODUCT, params )
  }

  searchProduct(query: string): Observable<any> {
    const params = { query: query }
    return this._httpService.get(this.PRODUCT, params )
  }
  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    // if user haven't added any product in localStorage
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData))
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: Cart) {
    const payload = JSON.stringify(cartData);
    return this.http.post(`${this.domain}${this.CART}`, payload, httpOptions);
  }

  getCartList(userId: number) {
    return this.http.get<Product[]>(`${this.domain}${this.CART}?userId=` + userId,
      { observe: 'response' }).subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      })
  }

  removeToCart(cartId: number) {
    return this.http.delete(`${this.domain}${this.CART}/` + cartId, httpOptions);
  }

  currentCart() {
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(`${this.domain}${this.CART}?userId=` + userData.id);

  }

  orderNow(data: Order) {
    const payload = JSON.stringify(data);
    return this.http.post(`${this.domain}${this.ORDERS}`, payload, httpOptions)
  }

  orderList() {
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>(`${this.domain}${this.ORDERS}?userId=` + userData.id)
  }
  deleteCartItems(cartId: number) {
    return this.http.delete(`${this.domain}${this.CART}/` + cartId, httpOptions).subscribe((result) => {
      if (result) {
        this.cartData.emit([])
      }
    })
  }

  cancelOrder(orderId: number) {
    return this.http.delete(`${this.domain}${this.ORDER}/` + orderId);
  }

}
