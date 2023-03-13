import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Product} from "../models/product.model";
import {ProductService} from "../shared/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  addMode: boolean = false
  productSub: Subscription;
  products: Product[] = this.productService.products;

  constructor(private productService: ProductService,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.fetchData();

  }

  fetchData() {
    this.productService.products = [];
    this.productSub = this.productService.getAllProducts().subscribe({
      next: () => {
        this.productSub.unsubscribe();
      },
      error: err => {
        this.productSub.unsubscribe();
        if (err['status'] === 401) {
          return this.productService.errorHandler("Error 401: Not authorized");
        } else if (err['statusText'] === "Unknown Error") {
          return this.productService.errorHandler("Error 404: Not found");
        } else this.productService.errorHandler(err);
      }
    });
  }

  async onDeleteProduct(product: Product) {

    this.productService.products = [];
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === product.id)
        this.products.splice(i, 1);
    }

    this.productSub = this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.productSub.unsubscribe();
        this._snackBar.open("Your product has been deleted", 'Nice!', {
          duration: 3000,
          horizontalPosition: 'right'
        });
      }, error: err => {
        this.productSub.unsubscribe();
        if (err['status'] === 401) {
          return this.productService.errorHandler("Error 401: Not authorized");
        } else if (err['statusText'] === "Unknown Error") {
          return this.productService.errorHandler("Error 404: Not found");
        } else this.productService.errorHandler(err);
      }
    })

  }

  onChangeMode(): void {
    this.addMode = !this.addMode;
  }

  onEditProduct(product: Product) {
    this.productService.productEdit = product;
    this.router.navigate(['/edit'])
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }
}

