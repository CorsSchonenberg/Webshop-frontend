import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Product} from "../shared/models/product.model";
import {Cart} from "../shared/models/Cart.model";
import {OrderService} from "../shared/order.service";
import {Order} from "../shared/models/order.model";
import {NextidService} from "../shared/nextid.service";
import {UserService} from "../shared/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public newId: number;
  nextIdSub: Subscription;
  newOrderSub: Subscription;
  public cart: Product[] = this.productService.cart;
  public showCart: Product[] = [];
  public filteredCart: Cart[] = this.productService.filteredCart;
  // public totalPrice: number;

  constructor(private productService: ProductService,
              private orderService: OrderService,
              private nextIdService: NextidService,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    // this.calculatePrice();
  }


  async onPay() {
    console.log("inpYa")
    this.filteredCart = this.productService.getFilteredCart();
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
    this.cart = []
    this.productService.cart = [];
    this.productService.cart$.next(this.productService.cart);
    this.productService.setFilteredCart([])

  }
}
