import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = ''
  constructor(private route: Router) { }

  ngOnInit(): void {

    // Imp new learning*********** using router service for checking route change****************
    this.route.events.subscribe((val: any)=>{      
      if(val.url){
        let sellerStore = localStorage.getItem('seller')
        if(sellerStore && val.url.includes('seller')){
          console.log("in seller area");
          this.menuType = 'seller'
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          
        }else{
          console.log("out of seller area");
          this.menuType = 'default'
        }
      }
    })
  }

  // LogOut function
  logout(){
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }

}
