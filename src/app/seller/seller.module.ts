import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SellerRoutingModule } from './seller-routing.module';


@NgModule({
  declarations: [    
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent
  ],
  imports: [
    SellerRoutingModule,
    SharedModule,
  ]
})
export class SellerModule { }