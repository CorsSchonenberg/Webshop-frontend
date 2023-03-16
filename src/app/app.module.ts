import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { StartComponent } from './start/start.component';
import {FormsModule} from "@angular/forms";
import { ShopComponent } from './shop/shop.component';
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/auth.module";
import {AdminModule} from "./admin/admin.module";
import {RouterModule} from "@angular/router";
import {CartModule} from "./cart/cart.module";

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ShopComponent,
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
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
