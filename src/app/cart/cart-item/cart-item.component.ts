import {Component, Input, OnInit} from '@angular/core';
import {Cart} from "../../shared/models/Cart.model";
import {ProductService} from "../../shared/product.service";
import {OrderService} from "../../shared/order.service";
import {UserService} from "../../shared/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Product} from "../../shared/models/product.model";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: Cart;
  public priceOutput: number

  public products: Product[] = this.productService.products;
  public cart: Cart[] = this.productService.filteredCart;


  constructor(private productService: ProductService,
              private orderService: OrderService,
              private userService: UserService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.productService.sortCartNumbers()
    this.productService.checkCartNumbers();
    this.productService.getProductAmount();
    this.calculatePrice();
  }

  calculatePrice(): void {
    this.priceOutput = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.priceOutput += this.cart[i].Product.price * this.cart[i].amount;
    }
  }

  onAddItem(cartItem: Cart): void {
    this.products.push(cartItem.Product);
    for (let i = 0; i < this.cart.length; i++) {
      if (cartItem.Product.id === this.cart[i].Product.id) {
        this.cart[i].amount = this.cart[i].amount + 1;
      }
    }
    this.calculatePrice();
    this.productService.setFilteredCart(this.cart);
    this.addCartToStorage();
    this.productService.cart$.next(this.productService.calculateCartAmount());
  }

  onDeleteItem(cartItem: Cart): void {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === cartItem.Product.id) {
        this.products.splice(i, 1);
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
    this.calculatePrice();
    this.productService.setFilteredCart(this.cart);
    this.addCartToStorage();
    this.productService.cart$.next(this.productService.calculateCartAmount());
  }

  addCartToStorage(): void {
    this.productService.addCartToStorage(this.products);
  }
}

