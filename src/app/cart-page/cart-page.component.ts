import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: Cart[] | undefined;
  priceSummary: priceSummary ={
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(
    private _productService: ProductService,
    private _router: Router
  ){}

  ngOnInit(): void {
    this._productService.currentCart().subscribe((result)=>{
      console.warn(result);
      this.cartData = result;
      let price = 0;
      this.cartData.forEach(item => {
        if(item.quantity) price = price + (+item.price* +item.quantity); //(+item.price) converts string to number
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price/10;//10% discount
      this.priceSummary.tax = price/10;//10% tax
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price+(price/10)+100-(price/10);
      console.warn('this.priceSummary', this.priceSummary);
    })
  }

  checkOut(){
    this._router.navigate(['/checkout']);
  }
}
