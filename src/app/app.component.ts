import {Component, OnInit} from '@angular/core';
import {OrderService} from "./shared/order.service";
import {Order} from "./models/order.model";
import {PromocodeService} from "./shared/promocode.service";
import {PromoCode} from "./models/promocode.model";
import {ProductService} from "./shared/product.service";
import {Product} from "./models/product.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{



  constructor() {
  }


}

