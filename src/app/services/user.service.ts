import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private  http: HttpClient,
    private _router: Router
  ) { }
  userSignUp(user: SignUp){
    this.http.post("http://localhost:3000/users", user, {observe: 'response'})//* bserve: 'response' to check the response
    .subscribe((result)=>{
      console.log('result', result);
      if(result){
        localStorage.setItem('user', JSON.stringify(result.body))
        this._router.navigate(['/'])
      }
    })
  }

  userLogin(data: Login){
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe: 'response'})
    .subscribe(result =>{
      if(result && result.body){
        localStorage.setItem('user', JSON.stringify(result.body[0]))
        this._router.navigate(['/'])
      }
    })
  }

  userAuthReload(){
    let userData = localStorage.getItem('user')
    if(userData){
      console.log("localStorage.getItem('user')", localStorage.getItem('user'));
      
      this._router.navigate(['/'])
    }

  }
}
