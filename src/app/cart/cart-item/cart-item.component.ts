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
  // @Output() priceOutput: EventEmitter<number> = new EventEmitter<number>();
  //
  // calculatePrice(): void {
  //   let count = 0;
  //   this.priceOutput.emit(count)
  //   for (let i = 0; i < this.filteredCart.length; i++) {
  //     count += this.filteredCart[i].Product.price * this.filteredCart[i].amount;
  //   }
  //   this.priceOutput.emit(count)
  // }

  public cart: Product[] = this.productService.cart;
  public showCart: Product[] = this.cart;
  public filteredCart: Cart[] = []


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
    this.productService.setFilteredCart(this.filteredCart);
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

    this.priceOutput = 0;
    for (let i = 0; i < this.filteredCart.length; i++) {
      this.priceOutput += this.filteredCart[i].Product.price * this.filteredCart[i].amount;
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
    this.productService.setFilteredCart(this.filteredCart);
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
    this.productService.setFilteredCart(this.filteredCart);
    this.calculatePrice();
  }
}

