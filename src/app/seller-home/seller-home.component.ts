import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | Product[];
  deleteMessage: undefined | string;
  constructor( private _product: ProductService ) { }

  ngOnInit(): void {
    this.getProductList()
  }

  getProductList(){
    this._product.productList().subscribe((result) => {
      this.productList = result
    })
  }

  deleteProduct(id: number){
    this._product.prodDelete(id).subscribe((result)=>{
      if (result){
        this.deleteMessage = 'Product has been deleted!'
        this.getProductList()
      }
    })
  }

}
