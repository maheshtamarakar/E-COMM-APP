import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './shared/components/cart-page/cart-page.component';
import { CheckoutComponent } from './shared/components/cart-page/checkout/checkout.component';
import { MyOrdersComponent } from './shared/components/cart-page/my-orders/my-orders.component';
import { SearchComponent } from './shared/components/header/search/search.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './shared/components/product-details/product-details.component';
import { SellerAddProductComponent } from './seller/seller-add-product/seller-add-product.component';
import { SellerHomeComponent } from './seller/seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller/seller-update-product/seller-update-product.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  // {
  //   path:'seller-auth',
  //   component:SellerAuthComponent
  // },
  {
    path:'seller-auth',
    loadChildren: () =>
    import('./seller/seller.module').then(
      (mod)=> mod.SellerModule
    ),
  },
  {
    path:'user-auth',
    loadChildren: () =>
    import('./usermnmt/usermnmt.module').then(
      (mod)=> mod.UsermnmtModule
    ),
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
