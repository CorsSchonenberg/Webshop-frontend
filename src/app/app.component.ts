import {Component, OnInit} from '@angular/core';
import {OrderService} from "./service/order.service";
import {Order} from "./models/order.model";
import {PromocodeService} from "./service/promocode.service";
import {PromoCode} from "./models/promocode.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'IPRWC-Frontend';


  constructor(private orderService: PromocodeService) {
  }

  ngOnInit(): void {
    let order = new PromoCode(3, 1, 'djhd', );
    this.orderService.getAllCodes().subscribe(() => {

        console.log(this.orderService.promoCodes)
      }
    )
  }
}

