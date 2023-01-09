import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Product} from "../models/product.model";
import {ProductService} from "../service/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  addMode: boolean = false
  productSub: Subscription;
  products: Product[] = this.productService.products;

  constructor(private productService: ProductService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.fetchData();

  }
  fetchData(){
    console.log('fetch')
    this.productService.products = [];
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

  async onDeleteProduct(product: Product) {

    this.productService.products = [];
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === product.id)
      this.products.splice(i, 1);
    }
    this.productSub = this.productService.deleteProduct(product.id).subscribe(() => {
      this.productSub.unsubscribe();
      this._snackBar.open("Your product has been deleted", 'Nice!', {
        duration: 3000,
        horizontalPosition: 'right'
      });

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
    })

  }
  onAddProduct(): void {
    this.addMode = !this.addMode;
  }
  onEditProduct(product: Product){
    this.productService.productEdit = product;
  }
}

