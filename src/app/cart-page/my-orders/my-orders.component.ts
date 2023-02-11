import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderData: Order[] | undefined;
  constructor(
    private _productService: ProductService
  ){}
    ngOnInit(): void {
      this.getOrderList()
    }

    cancelOrder(orderId: number | undefined): void {
      orderId && this._productService.cancelOrder(orderId).subscribe((result)=>{
        this.getOrderList()
      })
    }

    getOrderList(){
      this._productService.orderList().subscribe((result)=>{
        this.orderData = result;
      })
    }

}
