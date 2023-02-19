import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  inValidUserAuth = new EventEmitter<boolean>(false);
  constructor(
    private  http: HttpClient,
    private _router: Router
  ) { }
  userSignUp(user: SignUp){
    const payload = JSON.stringify(user);
    this.http.post('http://127.0.0.1:5000/auth/user-sign-up', payload, httpOptions)//* bserve: 'response' to check the response
    .subscribe((result)=>{
      console.log('result', result);
      if(result){
        localStorage.setItem('user', JSON.stringify(result))
        this._router.navigate(['/'])
      }
    })
  }

  userLogin(data: Login){
    this.http.get<SignUp[]>(`http://127.0.0.1:5000/auth/user-login?email=${data.email}&password=${data.password}`,
    {observe: 'response'})
    .subscribe(result =>{
      console.log('user login', result);
      if(result && result.body?.length){
        this.inValidUserAuth.emit(false)
        localStorage.setItem('user', JSON.stringify(result.body[0]))
        this._router.navigate(['/'])
      }else{
        this.inValidUserAuth.emit(true)
      }
    })
  }

  userAuthReload(){
    let userData = localStorage.getItem('user')
    if(userData){
      this._router.navigate(['/'])
    }

  }
}
