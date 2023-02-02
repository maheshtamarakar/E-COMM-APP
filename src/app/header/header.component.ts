import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { FormControl } from '@angular/forms';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = ''
  searchInput = new FormControl('');
  searchResult: undefined | Product[];
  constructor(
    private route: Router,
    private _product: ProductService
  ) { }

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
        )
      .subscribe(value => {
        if (value) {
          this._product.searchProduct(value).subscribe((result) => {
            if (result.length > 5) result.length = 5 //* to fix the number of suggestion element
            this.searchResult = result;
          })
        }
      });

    // Imp new learning*********** using router service for checking route change****************
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        let sellerStore = localStorage.getItem('seller')
        if (sellerStore && val.url.includes('seller')) {
          console.log("in seller area");
          this.menuType = 'seller'
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;

        } else {
          console.log("out of seller area");
          this.menuType = 'default'
        }
      }
    })
  }

  // LogOut function
  logout() {
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }

  hideSearch(){
    this.searchResult = undefined;
  }
  submitSearch(){
    const val = this.searchInput.value
    this.route.navigate([`search/${val}`])
  }

}
