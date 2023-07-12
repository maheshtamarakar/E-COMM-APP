import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from './seller/service/seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecomm-project';
  isHeader: boolean = true;
  constructor(
    private _router: Router,
    private _seller: SellerService, 
  ){}

  ngOnInit() {
    this._seller.url.subscribe((url)=>{
      console.log('url: ' + url);
      
      if(url.includes('seller-auth') || url.includes('user-auth')){
        this.isHeader = false;
      }else{
        this.isHeader = true;
      }
    })
  }
}
