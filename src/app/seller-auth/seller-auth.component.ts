import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router'
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  // all property
  showLogin: boolean = false;
  authError: string = '';
  // tips 
  // always make sure to make the return type of function
  constructor(private seller: SellerService, private router: Router ) { }
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
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = "Email or Password is not correct"
      }
    })
  }

  // show login or signup 
  toggleLoginSignUp(){
    this.showLogin = !this.showLogin;
  }



}
