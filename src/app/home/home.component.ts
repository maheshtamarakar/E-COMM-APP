import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | Product[];
  constructor(
    private _product: ProductService,
  ) { }

  ngOnInit(): void {
    this._product.popularProduct().subscribe((product) => {
      if(product){
        this.popularProducts = product
      }
    })
  }

}
