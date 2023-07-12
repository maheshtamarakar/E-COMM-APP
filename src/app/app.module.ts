import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller/seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller/seller-update-product/seller-update-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular moterial imports
import {MatIconModule} from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './components/header/search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './ursmnmt/user-auth/user-auth.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './cart-page/checkout/checkout.component';
import { MyOrdersComponent } from './cart-page/my-orders/my-orders.component';
import {MatBadgeModule} from '@angular/material/badge';
import { MaterialModule } from './material/material.module';
import { ClothCategoriesComponent } from './home/cloth-categories/cloth-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    FooterComponent,
    CartPageComponent,
    CheckoutComponent,
    MyOrdersComponent,
    ClothCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    NgbModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
