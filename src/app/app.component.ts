import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from './services/seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecomm-project';
  removeHeader: boolean = false;
  constructor(
    private _router: Router,
    private _seller: SellerService, 
  ){}

  ngOnInit() {
    this._seller.url.subscribe((url)=>{
      console.log('url: ' + url);
      
      if(url.includes('seller-auth')){
        this.removeHeader = true;
      }else{
        this.removeHeader = false;
      }
    })
  }
}
