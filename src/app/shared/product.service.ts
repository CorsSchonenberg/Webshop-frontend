import {Injectable} from '@angular/core';
import {Product} from "./models/product.model";
import {BehaviorSubject, map, Subject, tap} from "rxjs";
import {PromoCode} from "./models/promocode.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";
import {ApiResponse} from "./models/ApiResponse.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public cart: Product[] = [];
  public products: Product[] = [];
  public cart$: Subject<Product[]> = new BehaviorSubject<Product[]>([]);
  public productEdit: Product;

  constructor(private http: HttpClient,
              private userService: UserService,
              private _snackBar: MatSnackBar) {
  }

  public getAllProducts() {
    return this.http.get(environment.apiKey + 'product')
      .pipe(map(data => {
        const resData = new ApiResponse(
          data['code'],
          data['payload'],
          data['message'])
        if (resData.code === 'ACCEPTED') {
          if (this.products.length === 0) {
            this.products = [];
          }
          for (let i = 0; i < resData.payload.length; i++) {
            this.products.push(new Product(
              resData.payload[i].id,
              resData.payload[i].url,
              resData.payload[i].price,
              resData.payload[i].description))
          }
        } else {
          throw new Error(data['message'])
        }
      }))
  }

  public postProduct(newCode: Object) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.post<HttpClient>(environment.apiKey + 'product/insert', newCode, {
      headers: header
    })
      .pipe(map(data => {
        const resData = new ApiResponse(
          data['code'],
          data['payload'],
          data['message'])
        if (resData.code === 'ACCEPTED') {
        } else {
          throw new Error(resData.message)
        }
      }));
  }

  public deleteProduct(id: number) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.delete<HttpClient>(environment.apiKey + 'product/delete/' + id, {
      headers: header
    })
      .pipe(map(data => {
        const resData = new ApiResponse(
          data['code'],
          data['payload'],
          data['message'])
        if (resData.code === 'ACCEPTED') {
        } else {
          throw new Error(resData.message)
        }
      }));
  }

  public updateProduct(updatedCode: Object) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.put<HttpClient>(environment.apiKey + 'product/update', updatedCode, {
      headers: header
    })
      .pipe(map(data => {
        const resData = new ApiResponse(
          data['code'],
          data['payload'],
          data['message'])
        if (resData.code === 'ACCEPTED') {
        } else {
          throw new Error(resData.message)
        }
      }));
  }

  errorHandler(message: string) {
    return this._snackBar.open(message, 'Oh no..', {
      duration: 3000,
      horizontalPosition: 'right'
    });
  }
}
