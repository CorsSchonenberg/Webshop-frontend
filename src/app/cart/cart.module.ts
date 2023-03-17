import {NgModule} from "@angular/core";
import {CartComponent} from "./cart.component";
import {CartItemComponent} from "./cart-item/cart-item.component";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../shared/auth.guard";

@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: 'cart', component: CartComponent, canActivate: [AuthGuard] }])
  ],
  exports: [
    CartComponent,
    CartItemComponent
  ]
})
export class CartModule {

}
