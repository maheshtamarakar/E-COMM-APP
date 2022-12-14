import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  addProductMessage: string | undefined;

  constructor(private product: ProductService) { }

  ngOnInit(): void {
  }
  addProductData(productData: Product, prod: any) {
    console.log(productData);
    this.product.addProduct(productData).subscribe((result) => {
      console.log(result);
      if(result){
        this.addProductMessage = "Product added succesfully"
        setTimeout(() => {
          this.addProductMessage = undefined
        }, 3000);
      }
    })
    prod.reset();
  }

}
