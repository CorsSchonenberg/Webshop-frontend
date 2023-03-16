import {NgModule} from "@angular/core";
import {CartComponent} from "./cart.component";
import {CartItemComponent} from "./cart-item/cart-item.component";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CartComponent,
    CartItemComponent
  ]
})
export class CartModule {

}
