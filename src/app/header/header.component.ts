import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { FormControl } from '@angular/forms';
import { Product } from '../data-type';
import { SellerService } from '../services/seller.service';

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
  userName: string = '';
  cartItems = 0;
  isHeader: boolean = true;
  constructor(
    private route: Router,
    private _product: ProductService,
    private _seller: SellerService,
  ) { }

  ngOnInit(): void {
    this._seller.url.subscribe((url) => {
      console.log('url: ' + url);
      if (url.includes('seller-auth') || url.includes('user-auth')) {
        this.isHeader = false;
      } else {
        this.isHeader = true;
      }
    })

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

    // make a radio button giving true and false

    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length
    } else {
      this._product.cartData.subscribe((items) => {
        this.cartItems = items.length
      })
    }
  }

  ngAfterViewInit() {
    // Imp new learning*********** using router service for checking route change****************
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        let sellerStore = localStorage.getItem('seller')
        if (sellerStore && val.url.includes('seller')) {
          this.menuType = 'seller'
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this._product.getCartList(userData.id)
        } else {
          this.menuType = 'default'
        }
      }
    })

  }

  // seller LogOut function
  logout() {
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }

  userLogout() {
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
    this._product.cartData.emit([])
  }

  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch() {
    const val = this.searchInput.value
    this.route.navigate([`search/${val}`])
  }

  redirectToDetail(id: number) {
    this.route.navigate(['/details/' + id])
  }

}
