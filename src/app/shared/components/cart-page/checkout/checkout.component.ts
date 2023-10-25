import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Order } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: Cart[] | undefined;
  orderMsg: string | undefined;
  constructor(
    private _productService: ProductService,
    private _router: Router
  ){}

  ngOnInit() {
    this._productService.currentCart().subscribe((result)=>{
      let price = 0;
      this.cartData = result;
      result.forEach(item => {
        if(item.quantity) price = price + (+item.price* +item.quantity); //(+item.price) converts string to number
      });
      this.totalPrice = price+(price/10)+100-(price/10);
    })
  }

  orderNow(data: {email: string, address: string, contact: string}): void {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id
    if(this.totalPrice){
      let orderData: Order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id:undefined
      }

      this.cartData?.forEach((item)=>{
        setTimeout(() => {
          //you can delete products individually only if using json-server
          item?.id && this._productService.deleteCartItems(item.id)
        }, 700);
    })
      this._productService.orderNow(orderData).subscribe((result)=>{
        if(result){
          this.orderMsg = "Your order has been placed successfully"
          setTimeout(() => {
          this._router.navigate(['/my-orders'])
          this.orderMsg = undefined;
          }, 4000);
        }
      })
    }
  }
}
