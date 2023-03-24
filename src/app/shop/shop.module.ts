import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShopComponent} from "./shop.component";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ShopResolverService} from "../shared/shop-resolver.service";


@NgModule({
  declarations: [ShopComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', component: ShopComponent, resolve: {products: ShopResolverService},
      }
    ])
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule {
}
