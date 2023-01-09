import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./start/start.component";
import {SigninComponent} from "./signin/signin.component";
import {RegisterComponent} from "./register/register.component";
import {ShopComponent} from "./shop/shop.component";
import {CartComponent} from "./cart/cart.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  {path: '', component: StartComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admin', component: AdminComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
