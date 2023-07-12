import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Login, Product, SignUp } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/seller/service/seller.service';
import { UserService } from 'src/app/ursmnmt/service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin: boolean = true;
  authError: string = ''
  constructor(
    private _userService: UserService,
    private _productService: ProductService,
    private _activeRoute: ActivatedRoute,
    private seller: SellerService,
  ) { }

  ngOnInit(): void {
    this._userService.userAuthReload();
  }

  
  ngAfterViewInit() {
    this._activeRoute.params.subscribe(params => {
      const currentUrl = this._activeRoute.snapshot.url.join('/');
      this.seller.url.next(currentUrl)
      console.log('currentUrl', currentUrl);
    });
  }

  signUp(data: SignUp) {
    this._userService.userSignUp(data)
  }

  login(data: Login) {
    this._userService.userLogin(data);
    this._userService.inValidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "Please enter valid user details";
      }else{
        this.localCartToRemoteCart()
      }
    })
  }

  openSignUp() {
    this.authError = ''
    this.showLogin = false
  }
  openLogin() {
    this.showLogin = true
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    console.log('user: ' + user);
    let userId = user && JSON.parse(user).id
    console.log('userId: ' + userId);
    
    if (data) {
      let cartDataList: Product[] = JSON.parse(data);

      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId: userId
        }

        delete cartData.id;
        setTimeout(() => {
          this._productService.addToCart(cartData).subscribe((result: any)=>{
            if(result){
              console.log('data is stored in to db');
              this._productService.cartData.emit(result);
            }
          })
          if(cartDataList.length === index + 1){
            localStorage.removeItem('localCart');
          }
        }, 500);
      })
    }
    setTimeout(() => {
      this._productService.getCartList(userId)
    }, 1000);
  }
  
  ngOnDestroy() {
    this.seller.url.next('')
  }
}
