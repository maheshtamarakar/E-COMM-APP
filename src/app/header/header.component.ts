import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default';
  constructor(private route: Router) { }

  ngOnInit(): void {
    // Imp new learning*********** using router service for checking route change****************
    this.route.events.subscribe((val: any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          console.log("in seller area");
          this.menuType = 'seller'
        }else{
          console.log("out of seller area");
          this.menuType = 'default'
        }
      }
    })
  }

}
