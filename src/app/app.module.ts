import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { StartComponent } from './start/start.component';
import {FormsModule} from "@angular/forms";
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/auth.module";
import {AdminModule} from "./admin/admin.module";

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ShopComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
