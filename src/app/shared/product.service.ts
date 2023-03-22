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

  public cart: Product[] = [];
  public filteredCart: Cart[];
  public adminProducts: Product[] = [];
  public shopProducts: Product[] = [];
  public cart$: Subject<Product[]> = new BehaviorSubject<Product[]>([]);
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
}
