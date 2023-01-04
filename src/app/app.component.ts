import {Component, OnInit} from '@angular/core';
import {OrderService} from "./service/order.service";
import {Order} from "./models/order.model";
import {PromocodeService} from "./service/promocode.service";
import {PromoCode} from "./models/promocode.model";
import {ProductService} from "./service/product.service";
import {Product} from "./models/product.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'IPRWC-Frontend';


  constructor(private orderService: ProductService) {
  }

  ngOnInit(): void {
    let order = new Product(3, 'dejbed', 3, "sjdnTest");
    this.orderService.getAllProducts().subscribe(() => {

        console.log(this.orderService.products)
      }
    )
  }
}

