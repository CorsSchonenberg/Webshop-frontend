import {Component, Input, OnInit} from '@angular/core';
import {Cart} from "../../shared/models/Cart.model";
import {ProductService} from "../../shared/product.service";
import {OrderService} from "../../shared/order.service";
import {UserService} from "../../shared/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Product} from "../../shared/models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PromocodeService} from "../../shared/promocode.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: Cart;
  public priceOutput: number
  public calculatedDiscount: number = 0;


  public products: Product[] = this.productService.products;
  public cart: Cart[] =[];


  constructor(private productService: ProductService,
              private orderService: OrderService,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private promoCodeService: PromocodeService,
  ) {
  }

  ngOnInit(): void {
    this.productService.initializeProduct();
    this.cart = this.productService.filteredCart;
    this.calculatePrice();
  }

  calculatePrice(): void {
    this.priceOutput = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.priceOutput += this.cart[i].Product.price * this.cart[i].amount;
    }
    if (this.promoCodeService.activeCode) {
      this.calculatedDiscount = this.priceOutput * (this.promoCodeService.activeCode.discount);
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
    this.productService.filteredCart = this.cart;
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
    this.productService.filteredCart = this.cart;
    this.addCartToStorage();
    this.productService.cart$.next(this.productService.calculateCartAmount());
  }

  addCartToStorage(): void {
    this.productService.addCartToStorage(this.products);
  }
}

