import {Injectable} from '@angular/core';
import {Product} from "./models/product.model";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";
import {ApiResponse} from "./models/ApiResponse.model";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from "@angular/material/snack-bar";
import {Cart} from "./models/Cart.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: Product[] = this.getStorageCart();
  public cart: Cart[] = [];
  public filteredCart: Cart[] = [];
  public adminProducts: Product[] = [];
  public shopProducts: Product[] = [];
  output: number = this.calculateCartAmount()
  public cart$: Subject<number> = new BehaviorSubject<number>(this.output);

  public productEdit: Product;

  constructor(private http: HttpClient,
              private userService: UserService,
              private _snackBar: MatSnackBar) {
  }

  public getAllProducts(): Observable<void> {
    return this.http.get<ApiResponse>(environment.apiKey + 'product')
      .pipe(map(data => {
        if (data.code === 'ACCEPTED') {
          if (this.adminProducts.length === 0) {
            this.adminProducts = [];
            this.shopProducts = []
          }
          for (let i = 0; i < data.payload.length; i++) {
            this.adminProducts.push(new Product(
              data.payload[i].id,
              data.payload[i].url,
              data.payload[i].price,
              data.payload[i].description,
              data.payload[i].active))
          }
          this.createFilteredShop()
        } else {
          throw new Error(data.message)
        }
      }))
  }

  public postProduct(newCode: Object): Observable<void> {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.post<ApiResponse>(environment.apiKey + 'product/' + this.userService.getUser().id + '/insert', newCode, {
      headers: header
    })
      .pipe(map(data => {
        if (data.code === 'ACCEPTED') {
        } else {
          throw new Error(data.message)
        }
      }));
  }

  public deleteProduct(id: number): Observable<void> {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.delete<ApiResponse>(environment.apiKey + 'product/' + this.userService.getUser().id + '/delete/' + id, {
      headers: header
    })
      .pipe(map(data => {
        if (data.code === 'ACCEPTED') {
        } else {
          throw new Error(data.message)
        }
      }));
  }

  public updateProduct(updatedCode: Object): Observable<void> {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.put<ApiResponse>(environment.apiKey + 'product/' + this.userService.getUser().id + '/update', updatedCode, {
      headers: header
    })
      .pipe(map(data => {
        if (data.code === 'ACCEPTED') {
        } else {
          throw new Error(data.message)
        }
      }));
  }

  errorHandler(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this._snackBar.open(message, 'Oh no..', {
      duration: 3000,
      horizontalPosition: 'right'
    });
  }


  setFilteredCart(newFilteredCart: Cart[]): void {
    this.filteredCart = newFilteredCart;
  }

  createFilteredShop(): void {
    for (let i = 0; i < this.adminProducts.length; i++) {
      if (this.adminProducts[i].active) {
        this.shopProducts.push(this.adminProducts[i])
      }
    }
  }

  addCartToStorage(products: Product []): void {
    sessionStorage.setItem('cart', JSON.stringify(products));
  }

  resetCartStorage(): void {
    sessionStorage.removeItem('cart');
  }

  getStorageCart(): Product[] {
    if (JSON.parse(sessionStorage.getItem('cart')) === null) {
      return [];
    } else {
      return JSON.parse(sessionStorage.getItem('cart'))
    }
  }

  calculateCartAmount(): number {
    let storageCart = this.getStorageCart()
    if (storageCart === null) {
      return;
    }
    return storageCart.length;
  }

  resetService(): void {
    this.products = [];
    this.filteredCart = [];
    this.adminProducts = [];
    this.productEdit = null;
    this.output = 0;
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
        this.filteredCart[count].amount = amount;
        count++;
        break;
      }
      if (this.products[i].id !== this.products[i + 1].id) {
        this.filteredCart[count].amount = amount;
        count++;
        amount = 0;
      }
    }

    let temporaryCart = []
    for (let i = 0; i < this.filteredCart.length; i++) {
      if (this.filteredCart[i].amount !== null) {
        temporaryCart.push(this.filteredCart[i])
      }
      this.filteredCart = temporaryCart;
      console.log(this.filteredCart)
    }
  }

  checkCartNumbers(): void {
    for (let i = 0; i < this.products.length; i++) {
      if (this.filteredCart.length === 0) {
        this.filteredCart.push(new Cart(this.products[i], null));

      }
      if (this.products.length - 1 === i) {
        return;
      }
      if (this.products[i].id !== this.products[i + 1].id) {
        this.filteredCart.push(new Cart(this.products[i + 1], null));
      }
    }
  }
  test(product: Product) {
    this.products.push(product);
    this.addCartToStorage(this.products)
    this.sortCartNumbers()
    this.checkCartNumbers();
    this.getProductAmount();
  }
}
