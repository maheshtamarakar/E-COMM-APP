import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { ActivatedRoute, Router } from '@angular/router'
import { SignUp } from '../../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit, AfterViewInit {
  // all property
  showLogin: boolean = true;
  authError: string = '';
  // tips
  // always make sure to make the return type of function

  constructor(
    private seller: SellerService,
    private router: Router,
    private _activeRoute: ActivatedRoute,
  ) { }
  // inside the constructor parameter we make objects

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  // all methods
  // call signup service file to store the data
  signUp(data: SignUp): void {
    this.seller.userSignUp(data)
  }

  // call login service file to store the data
  logIn(data: SignUp): void {
    this.authError = '';
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or Password is not correct"
      }
    })
  }

  // show login or signup 
  toggleLoginSignUp() {
    this.showLogin = !this.showLogin;
  }

  ngAfterViewInit() {
    this._activeRoute.params.subscribe(params => {
      const currentUrl = this._activeRoute.snapshot.url.join('/');
      this.seller.url.next(currentUrl)
      console.log('currentUrl', currentUrl);
    });
  }

  ngOnDestroy() {
    this.seller.url.next('')
  }

}
