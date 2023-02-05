import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  productQuantity: number = 1
  constructor(
    private _activeRoute: ActivatedRoute,
    private _productService: ProductService    
    ){}

    ngOnInit(): void {
      let productId = this._activeRoute.snapshot.paramMap.get('productId');
      productId && this._productService.getProduct(productId).subscribe((result) => {
        this.productData = result;
      })
    }

    handleQuantity(val: string){
      if(this.productQuantity < 20 && val==='plus'){
        this.productQuantity+=1;
      }else if(this.productQuantity > 1 && val==='min'){
        this.productQuantity-=1;
      }
    }
}
