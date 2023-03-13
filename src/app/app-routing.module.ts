import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./start/start.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ShopComponent} from "./shop/shop.component";
import {CartComponent} from "./cart/cart.component";
import {AdminComponent} from "./admin/admin.component";
import {EditmodeComponent} from "./admin/editmode/editmode.component";
import {AuthGuard} from "./shared/auth.guard";
import {AdminGuard} from "./shared/admin.guard";
import {ShopResolverService} from "./shared/shop-resolver.service";

const routes: Routes = [
  {path: '', component: ShopComponent, resolve: {products: ShopResolverService}},
  {path: 'signin', component: SigninComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'edit', component: EditmodeComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
