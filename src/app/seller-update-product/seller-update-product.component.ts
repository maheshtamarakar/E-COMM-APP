import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined| Product;
  constructor(private _route: ActivatedRoute, private _product: ProductService){}

  ngOnInit(): void {
    let productId = this._route.snapshot.paramMap.get('id'); //*why id -> bcoz at routing file I have set it to be id
    productId && this._product.getProduct(productId).subscribe(data => {
      console.log(data);
      this.productData = data;
    })
  }
  updateProductData(data: any, value: any){

  }
}
