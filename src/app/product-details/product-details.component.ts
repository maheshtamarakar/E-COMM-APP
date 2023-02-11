import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  productQuantity: number = 1
  removeCart = false
  cartData: Product | undefined;
  constructor(
    private _activeRoute: ActivatedRoute,
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    let productId = this._activeRoute.snapshot.paramMap.get('productId');
    productId && this._productService.getProduct(productId).subscribe((result) => {
      this.productData = result;
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData)
        items = items.filter((item: Product) => productId == item.id.toString())
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user')
      if (user) {
        let userId = user && JSON.parse(user).id
        this._productService.getCartList(userId);
        this._productService.cartData.subscribe(result => {
          let item = result.filter((item: Product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })

      }
    })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity
      // if user is not logged in
      if (!localStorage.getItem('user')) {
        this._productService.localAddToCart(this.productData)
        this.removeCart = true;
      } else {
        //* user is logged in save all localStorage data to db of that user
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        let cartData: Cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        delete cartData.id;
        this._productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this._productService.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this._productService.removeItemFromCart(productId);
    } else {
      let user = localStorage.getItem('user')
      let userId = user && JSON.parse(user).id
      this.cartData && this._productService.removeToCart(this.cartData.id)
      .subscribe((result) => {
        if(result){
          this._productService.getCartList(userId)
        }
      })
    }
    this.removeCart = false;
  }
}
