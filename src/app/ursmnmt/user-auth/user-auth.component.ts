import { Component } from '@angular/core';
import { Login, SignUp } from 'src/app/data-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin: boolean = true;
  constructor(
    private _userService: UserService
    ){}

  ngOnInit(): void {
    this._userService.userAuthReload();
  }

  signUp(data:SignUp){
    this._userService.userSignUp(data)
  }

  login(data: Login){
    this._userService.userLogin(data);
  }

  openSignUp(){
    this.showLogin = false
  }
  openLogin(){
    this.showLogin = true
  }
}
