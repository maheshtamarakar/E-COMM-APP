import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './cart-page/checkout/checkout.component';
import { MyOrdersComponent } from './cart-page/my-orders/my-orders.component';
import { SearchComponent } from './components/header/search/search.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SellerAddProductComponent } from './seller/seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller/seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller/seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './ursmnmt/user-auth/user-auth.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'seller-auth',
    component:SellerAuthComponent
  },
  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'seller-add-product',
    component:SellerAddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'seller-update-product/:id',
    component:SellerUpdateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'search/:query',
    component:SearchComponent,
  },
  {
    path:'details/:productId',
    component:ProductDetailsComponent,
  },
  {
    path:'user-auth',
    component:UserAuthComponent,
  },
  {
    path:'cart-page',
    component:CartPageComponent,
  },
  {
    path:'checkout',
    component:CheckoutComponent,
  },
  {
    path:'my-orders',
    component:MyOrdersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
