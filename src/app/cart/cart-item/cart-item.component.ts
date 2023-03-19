import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cart} from "../../shared/models/Cart.model";
import {ProductService} from "../../shared/product.service";
import {OrderService} from "../../shared/order.service";
import {NextidService} from "../../shared/nextid.service";
import {UserService} from "../../shared/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {Product} from "../../shared/models/product.model";
import {Order} from "../../shared/models/order.model";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: Cart;
  public priceOutput: number

  public products: Product[] = this.productService.cart;
  public cart: Cart[] = [];


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
    this.productService.setFilteredCart(this.cart);
  }

  sortCartNumbers(): void {
    for (let i = 0; i < this.products.length; i++) {
      for (let j = 0; j < (this.products.length - i - 1); j++) {
        if (this.products[j].id > this.products[j + 1].id) {
          let temp = this.products[j]
          this.products[j] = this.products[j + 1]
          this.products[j + 1] = temp
        }
      }
    }
  }

  getProductAmount(): void {
    let count = 0;
    let amount = 0;
    for (let i = 0; i < this.products.length; i++) {
      amount++;
      if (this.products.length - 1 === i) {
        this.cart[count].amount = amount;
        count++;
        break;
      }
      if (this.products[i].id !== this.products[i + 1].id) {
        this.cart[count].amount = amount;
        count++;
        amount = 0;
      }
    }
  }

  checkCartNumbers(): void {
    for (let i = 0; i < this.products.length; i++) {
      if (this.cart.length === 0) {
        this.cart.push(new Cart(this.products[i], null));

      }
      if (this.products.length - 1 === i) {
        return;
      }
      if (this.products[i].id !== this.products[i + 1].id) {
        this.cart.push(new Cart(this.products[i + 1], null));
      }
    }
  }

  calculatePrice(): void {

    this.priceOutput = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.priceOutput += this.cart[i].Product.price * this.cart[i].amount;
    }
  }

  onAddItem(cartItem: Cart): void {
    this.products.push(cartItem.Product);
    this.productService.cart$.next(this.productService.cart.slice());
    for (let i = 0; i < this.cart.length; i++) {
      if (cartItem.Product.id === this.cart[i].Product.id) {
        this.cart[i].amount = this.cart[i].amount + 1;
      }
    }
    this.calculatePrice();
    this.productService.setFilteredCart(this.cart);
  }

  onDeleteItem(cartItem: Cart): void {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === cartItem.Product.id) {
        this.products.splice(i, 1);
        this.productService.cart$.next(this.productService.cart.slice());
        break;
      }
    }
    for (let i = 0; i < this.cart.length; i++) {
      if (cartItem.Product.id === this.cart[i].Product.id) {
        this.cart[i].amount = this.cart[i].amount - 1;
        if (this.cart[i].amount < 1) {
          this.cart.splice(i, 1);

        }

      }
    }
    this.productService.setFilteredCart(this.cart);
    this.calculatePrice();
  }
}

