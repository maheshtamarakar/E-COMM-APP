import {NgModule} from '@angular/core'
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// ************components **********************//
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CheckoutComponent } from './components/cart-page/checkout/checkout.component';
import { MyOrdersComponent } from './components/cart-page/my-orders/my-orders.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/header/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [
        CartPageComponent,
        CheckoutComponent,
        MyOrdersComponent,
        FooterComponent,
        HeaderComponent,
        SearchComponent,
        ProductDetailsComponent,
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        MyOrdersComponent,
        FooterComponent,
        HeaderComponent,
        SearchComponent,
        ProductDetailsComponent,
        NgbModule,
        CartPageComponent,
        CheckoutComponent,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        RouterModule
    ]
})
export class SharedModule {
    constructor(){}
}