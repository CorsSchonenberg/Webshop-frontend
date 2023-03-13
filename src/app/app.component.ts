import {Component, OnInit} from '@angular/core';
import {OrderService} from "./shared/order.service";
import {Order} from "./shared/models/order.model";
import {PromocodeService} from "./shared/promocode.service";
import {PromoCode} from "./shared/models/promocode.model";
import {ProductService} from "./shared/product.service";
import {Product} from "./shared/models/product.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{



  constructor() {
  }


}

