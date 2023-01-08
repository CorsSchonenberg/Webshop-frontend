import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../models/product.model";
import {Cart} from "../models/Cart.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cart: Product[] = this.productService.cart;
  public showCart: Product[] = this.cart;
  public filteredCart: Cart[] = []
  public totalPrice: number = 0;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.sortCartNumbers()
    this.checkCartNumbers();
    this.getProductAmount();
    this.calculatePrice();
  }

  sortCartNumbers() {
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

  getProductAmount() {
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

  checkCartNumbers() {
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

  calculatePrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.filteredCart.length; i++) {
      this.totalPrice += this.filteredCart[i].Product.price *  this.filteredCart[i].amount;
    }
  }
  onAddItem(cartItem: Cart) {
    this.cart.push(cartItem.Product);
    this.productService.cart$.next(this.productService.cart.slice());
    for (let i = 0; i < this.filteredCart.length; i++) {
      if (cartItem.Product.id === this.filteredCart[i].Product.id){
        this.filteredCart[i].amount = this.filteredCart[i].amount + 1;
      }
    }
    this.calculatePrice();
  }

  onDeleteItem(cartItem: Cart){
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id === cartItem.Product.id ){
        console.log(this.cart)
        this.cart.splice(i, 1);
        this.productService.cart$.next(this.productService.cart.slice());
        break;
      }
    }
    for (let i = 0; i < this.filteredCart.length; i++) {
      if (cartItem.Product.id === this.filteredCart[i].Product.id){
        this.filteredCart[i].amount = this.filteredCart[i].amount - 1;
        if( this.filteredCart[i].amount < 1){
          this.filteredCart.splice(i, 1);

        }

      }
    }
    console.log(this.cart.length)

    this.calculatePrice();
  }
}
