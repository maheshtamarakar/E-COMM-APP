import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  // tips 
  // always make sure to make the return type of function
  constructor() { }

  ngOnInit(): void {
  }

  signUp(data:object):void {
    console.warn(data);
    
  }



}
