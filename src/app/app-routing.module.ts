import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./start/start.component";
import {SigninComponent} from "./signin/signin.component";
import {RegisterComponent} from "./register/register.component";
import {ShopComponent} from "./shop/shop.component";
import {CartComponent} from "./cart/cart.component";
import {AdminComponent} from "./admin/admin.component";
import {EditmodeComponent} from "./admin/editmode/editmode.component";
import {AuthGuard} from "./shared/auth.guard";
import {AdminGuard} from "./shared/admin.guard";

const routes: Routes = [
  {path: '', component: StartComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'shop', component: ShopComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'edit', component: EditmodeComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
