import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../models/product.model";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  productSub: Subscription;
  products: Product[] = this.productService.products;

  constructor(private productService: ProductService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.productService.products.length !== 0) {
      return;
    }
    this.fetchData();

  }

  fetchData() {
    this.productSub = this.productService.getAllProducts().subscribe({
      error: err => {
        if (err['status'] === 401) {
          return this.productService.errorHandler("Error 402: Not authorized");
        } else if (err['statusText'] === "Unknown Error") {
          return this.productService.errorHandler("Error 404: Not found");
        } else this.productService.errorHandler(err);
      }
    })
  }

  onAddToCart(product: Product) {
    this.productService.cart.push(product)
    this.productService.cart$.next(this.productService.cart.slice());
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }
}
