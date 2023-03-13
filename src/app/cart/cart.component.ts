import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Product} from "../models/product.model";
import {Cart} from "../models/Cart.model";
import {OrderService} from "../shared/order.service";
import {Order} from "../models/order.model";
import {NextidService} from "../shared/nextid.service";
import {UserService} from "../shared/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";

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
  public showCart: Product[] = this.cart;
  public filteredCart: Cart[] = []
  public totalPrice: number = 0;

  constructor(private productService: ProductService,
              private orderService: OrderService,
              private nextIdService: NextidService,
              private userService: UserService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.sortCartNumbers()
    this.checkCartNumbers();
    this.getProductAmount();
    this.calculatePrice();
  }

  sortCartNumbers(): void {
    for (let i = 0; i < this.showCart.length; i++) {
      for (let j = 0; j < (this.showCart.length - i - 1); j++) {
        if (this.showCart[j].id > this.showCart[j + 1].id) {
          let temp = this.showCart[j]
          this.showCart[j] = this.showCart[j + 1]
          this.showCart[j + 1] = temp
        }
      }
    }
  }

  getProductAmount(): void {
    let count = 0;
    let amount = 0;
    for (let i = 0; i < this.showCart.length; i++) {
      amount++;
      if (this.showCart.length - 1 === i) {
        this.filteredCart[count].amount = amount;
        count++;
        break;
      }
      if (this.showCart[i].id !== this.showCart[i + 1].id) {
        this.filteredCart[count].amount = amount;
        count++;
        amount = 0;
      }
    }
  }

  checkCartNumbers(): void {
    for (let i = 0; i < this.showCart.length; i++) {
      if (this.filteredCart.length === 0) {
        this.filteredCart.push(new Cart(this.showCart[i], null));

      }
      if (this.showCart.length - 1 === i) {
        return;
      }
      if (this.showCart[i].id !== this.showCart[i + 1].id) {
        this.filteredCart.push(new Cart(this.showCart[i + 1], null));
      }
    }
  }

  calculatePrice(): void {
    this.totalPrice = 0;
    for (let i = 0; i < this.filteredCart.length; i++) {
      this.totalPrice += this.filteredCart[i].Product.price * this.filteredCart[i].amount;
    }
  }

  onAddItem(cartItem: Cart): void {
    this.cart.push(cartItem.Product);
    this.productService.cart$.next(this.productService.cart.slice());
    for (let i = 0; i < this.filteredCart.length; i++) {
      if (cartItem.Product.id === this.filteredCart[i].Product.id) {
        this.filteredCart[i].amount = this.filteredCart[i].amount + 1;
      }
    }
    this.calculatePrice();
  }

  onDeleteItem(cartItem: Cart): void {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id === cartItem.Product.id) {
        this.cart.splice(i, 1);
        this.productService.cart$.next(this.productService.cart.slice());
        break;
      }
    }
    for (let i = 0; i < this.filteredCart.length; i++) {
      if (cartItem.Product.id === this.filteredCart[i].Product.id) {
        this.filteredCart[i].amount = this.filteredCart[i].amount - 1;
        if (this.filteredCart[i].amount < 1) {
          this.filteredCart.splice(i, 1);

        }

      }
    }
    this.calculatePrice();
  }

  async onPay() {
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
        next: data => {
          console.log("yeahhhhh")
          if (this.filteredCart.length - 1 === i) {
            this._snackBar.open('Your order has been handled', 'Nice!', {
              duration: 3000,
              horizontalPosition: 'right'
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
    this.totalPrice = 0;
    this.cart = []
    this.productService.cart = [];
    this.productService.cart$.next(this.productService.cart);

  }
}
