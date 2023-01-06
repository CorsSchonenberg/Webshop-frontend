import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../models/product.model";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  productSub: Subscription;
  products: Product[] = this.productService.products;

  constructor(private productService: ProductService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.productSub = this.productService.getAllProducts().subscribe(() => {
      this.productSub.unsubscribe();
    }, error => {
      this.productSub.unsubscribe();
      if (error['statusText'] == "Unknown Error") {
        return this._snackBar.open("Error: 404 Not Found", 'Oh no..', {
          duration: 3000,
          horizontalPosition: 'right'
        });
      } else {
        return this._snackBar.open(error, 'Oh no..', {
          duration: 3000,
          horizontalPosition: 'right'
        });
      }
    });

  }
  onAddToCart(product: Product) {
    this.productService.cart.push(product)
    this.productService.cart$.next(this.productService.cart.slice());
  }
}
