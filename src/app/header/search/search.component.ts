import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: Product[] = [];
  constructor(
    private _activeRoute: ActivatedRoute,
    private _productService: ProductService
  ){}

  ngOnInit(): void {
    let query = this._activeRoute.snapshot.paramMap.get('query')
    query && this._productService.searchProduct(query).subscribe((result)=>{
      console.log('result', result);
      
      this.searchResult = result;
    })
  }

}
