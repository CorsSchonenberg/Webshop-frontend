import {Component, OnInit} from '@angular/core';
import {OrderService} from "./service/order.service";
import {Order} from "./models/order.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'IPRWC-Frontend';


  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    let order = new Order(2, 1, 2, 1);
    this.orderService.getAllOrders().subscribe(() => {

        console.log(this.orderService.orders)
      }
    )
  }
}

