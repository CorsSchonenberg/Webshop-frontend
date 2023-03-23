import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Cart} from "../shared/models/Cart.model";
import {OrderService} from "../shared/order.service";
import {Order} from "../shared/models/order.model";
import {UserService} from "../shared/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PromocodeService} from "../shared/promocode.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  newOrderSub: Subscription;
  promoCodeMode: boolean = false;
  promoCodeButtonMessage: string = "Add Code";
  codeMessage: string = this.codeMessageHandler();
  filteredCart: Cart[];

  constructor(private productService: ProductService,
              private orderService: OrderService,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private promoCodeService: PromocodeService,) {
  }

  ngOnInit(): void {
  }


   onPay() {
    this.productService.initializeProduct();
    this.filteredCart = this.productService.filteredCart;
    console.log(this.productService.filteredCart)
    let orders: Order [] = [];
    for (let i = 0; i < this.filteredCart.length; i++) {
      let userId: number = this.userService.getUser().id;
      let order = new Order(
        null,
        this.filteredCart[i].Product.id,
        this.filteredCart[i].amount,
        userId)
      delete order.id;
      orders.push(order)
    }
    this.newOrderSub = this.orderService.postOrder(orders).subscribe({
      next: () => {
        this.productService.resetCartStorage();
        let snackBarRef = this._snackBar.open('Your order has been handled', 'Nice!', {
          duration: 2000,
          horizontalPosition: 'right'
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.productService.cart$.next(0);
          this.newOrderSub.unsubscribe();
          this.router.navigate(['/'])
        });
        this.newOrderSub.unsubscribe();
      }, error: err => {
        if (err['status'] === 401) {
          return this.orderService.errorHandler("Error 401: Not authorized");
        } else if (err['statusText'] === "Unknown Error") {
          return this.orderService.errorHandler("Error 404: Not found");
        } else this.orderService.errorHandler(err);
      }
    })
    this.filteredCart = [];
    this.productService.products = [];
    this.productService.filteredCart = []
  }

  onChangePromoCodeMode(): void {
    this.promoCodeMode = !this.promoCodeMode;

    if (this.promoCodeMode) {
      this.promoCodeButtonMessage = "Go Back";
    } else {
      this.promoCodeButtonMessage = "Add Code";
    }
  }

  codeMessageHandler(): string {
    if (this.promoCodeService.activeCode !== undefined) {
      return "Your activated Code: " +
        this.promoCodeService.activeCode.code +
        ". Your dicount: " +
        this.promoCodeService.activeCode.discount * 100 +
        "%";
    } else {
      return "You dont have a Active code";
    }
  }


}
