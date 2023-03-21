import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/auth.module";
import {AdminModule} from "./admin/admin.module";
import {RouterModule} from "@angular/router";
import {CartModule} from "./cart/cart.module";
import {ShopModule} from "./shop/shop.module";
import { PromocodeComponent } from './promocode/promocode.component';
import {PromocodeModule} from "./promocode/promocode.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    AdminModule,
    CartModule,
    ShopModule,
    PromocodeModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
