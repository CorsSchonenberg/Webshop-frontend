import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {Product} from "../shared/models/product.model";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnDestroy, OnInit {
  productSub: Subscription;
  products: Product[] = this.productService.shopProducts;
  loadAlert: boolean = false;

  constructor(private productService: ProductService,
              private _snackBar: MatSnackBar,
              private userService: UserService,
              private router: Router) {
  }


  ngOnInit() {
    if (this.productService.adminProducts.length !== 0) {
      return;
    }
    this.fetchData();

    console.log(this.productService.adminProducts)

  }

  fetchData() {
    this.productSub = this.productService.getAllProducts().subscribe({
      next: () => {
        this.productSub.unsubscribe();
      }
      , error: err => {
        if (err['status'] === 401) {
          return this.productService.errorHandler("Error 401: Not authorized");
        } else if (err['statusText'] === "Unknown Error") {
          return this.productService.errorHandler("Error 404: Not found");
        } else this.productService.errorHandler(err);
      }
    });
  }

  onAddToCart(product: Product) {
    if (this.userService.getUser() === null) {
      this.loadAlert = true;
      return;
    }
    this.loadAlert = false;
    this.productService.cart.push(product)
    this.productService.cart$.next(this.productService.cart.slice());
  }

  ngOnDestroy(): void {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }

  onPress(): void {
    this.loadAlert = !this.loadAlert;
  }

  onLogin(): void {
    this.router.navigate(['/signin'])
  }
}
