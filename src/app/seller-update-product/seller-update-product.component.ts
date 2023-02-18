import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | Product;
  constructor(private _route: ActivatedRoute,
    private _product: ProductService,
    private route: Router
  ) { }

  ngOnInit(): void {
    let productId = this._route.snapshot.paramMap.get('id'); //*why id -> bcoz at routing file I have set it to be id
    productId && this._product.getProduct(productId).subscribe(data => {
      console.log(data);
      this.productData = data;
    })
  }
  updateProductData(data: Product, value: any) {
    console.log('data ->', data);
    let productId = this._route.snapshot.paramMap.get('id');
    this._product.updateProduct(data, productId).subscribe(res => {
      console.log("updated product res", res);
      
      if (res) {
        this._product.productUpdate['updateProductMessage'] = "Product updated"
        this.route.navigate(['/seller-home'])
      }
    })
  }
}
