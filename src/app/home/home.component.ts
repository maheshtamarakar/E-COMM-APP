import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | Product[];
  trendyProduct$:undefined | Observable<Product[]>;
  constructor(
    private _product: ProductService,
  ) { 
    this.trendyProduct$ = this._product.trendyProduct()
  }

  ngOnInit(): void {
    // this._product.popularProduct().subscribe((product) => {
    //   if(product){
    //     this.popularProducts = product
    //   }
    // })
    // this._product.trendyProduct().subscribe((product) => {
    //   if(product){
    //     this.trendyProduct = product
    //   }
    // })
  }

}
