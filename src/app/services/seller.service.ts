import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http' // will help call api url
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isLoginError = new EventEmitter<boolean>(false);
  //rxjs to control the authgaurd being true or false
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  constructor(private http:HttpClient, private router: Router) { }
  userSignUp(data: SignUp){
    const payload = JSON.stringify(data);
    this.http.post('http://127.0.0.1:5000/auth/sign-up',
    payload, httpOptions
    ).subscribe((result)=>{      
      console.log('result', result);
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result))
      this.router.navigate(['seller-home'])      
    })
  }
  userLogin(data: Login){
    this.http.get(`http://127.0.0.1:5000/auth/login?email=${data.email}&password=${data.password}`,
    {observe: 'response'} // to get json server response
    ).subscribe((result: any)=>{
      console.log('loginUser result', result);
      if(result && result.body && result.body.length){
        console.log("user successfully logged in");
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }else{
        this.isLoginError.emit(true)
        console.log("login failed");
      }
    })
  }


  reloadSeller(){
    if(localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }
}