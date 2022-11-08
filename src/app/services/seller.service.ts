import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' // will help call api url
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isLoginError = new EventEmitter<boolean>(false);
  //rxjs to control the authgaurd being true or false
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  constructor(private http:HttpClient, private router: Router) { }
  userSignUp(data: SignUp){
    this.http.post('http://localhost:3000/seller',
    data,
    {observe: 'response'} // to get json server response
    ).subscribe((result)=>{      
      console.log('result', result);
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body))
      this.router.navigate(['seller-home'])      
    })
  }
  userLogin(data: Login){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe: 'response'} // to get json server response
    ).subscribe((result: any)=>{
      console.log(result.body);
      
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