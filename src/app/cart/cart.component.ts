import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Cart} from "../shared/models/Cart.model";
import {OrderService} from "../shared/order.service";
import {Order} from "../shared/models/order.model";
import {UserService} from "../shared/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

import {Subscription} from "rxjs";
import {Router} from "@angular/router";
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
  public filteredCart: Cart[] = this.productService.filteredCart;

  constructor(private productService: ProductService,
              private orderService: OrderService,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private promoCodeService: PromocodeService) {
  }

  ngOnInit(): void {
  }


  async onPay() {
    this.filteredCart = this.productService.filteredCart;
    let userId: number = this.userService.getUser().id;
    for (let i = 0; i < this.filteredCart.length; i++) {
      await new Promise(r => setTimeout(r, 250));
      let order = new Order(
        null,
        this.filteredCart[i].Product.id,
        this.filteredCart[i].amount,
        userId)
      delete order.id;

      this.newOrderSub = this.orderService.postOrder(order).subscribe({
        next: () => {
          if (this.filteredCart.length - 1 === i) {
            let snackBarRef = this._snackBar.open('Your order has been handled', 'Nice!', {
              duration: 3000,
              horizontalPosition: 'right'
            });
            snackBarRef.afterDismissed().subscribe(() => {
              this.newOrderSub.unsubscribe();
              this.router.navigate(['/'])
            });
          }

          this.newOrderSub.unsubscribe();
        }, error: err => {
          if (err['status'] === 401) {
            return this.orderService.errorHandler("Error 401: Not authorized");
          } else if (err['statusText'] === "Unknown Error") {
            return this.orderService.errorHandler("Error 404: Not found");
          } else this.orderService.errorHandler(err);

        }
      })
    }
    await new Promise(r => setTimeout(r, 1000));
    this.filteredCart = [];
    this.productService.cart = [];
    this.productService.cart$.next(this.productService.cart);
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
    console.log(this.promoCodeService.activeCode)
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
