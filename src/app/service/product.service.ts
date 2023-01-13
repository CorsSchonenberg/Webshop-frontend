import {Injectable} from '@angular/core';
import {Product} from "../models/product.model";
import {BehaviorSubject, map, Subject} from "rxjs";
import {PromoCode} from "../models/promocode.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public cart: Product[] = [];
  public products: Product[] = [];
  public cart$: Subject<Product[]> = new BehaviorSubject<Product[]>([]);
  public productEdit: Product;

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  public getAllProducts() {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.get(environment.apiKey + 'product', {
      headers: header
    })
      .pipe(map(res => {
        if (res['code'] === 'ACCEPTED') {
          if (this.products.length === 0) {
            this.products = [];
          }
          for (let i = 0; i < res['payload'].length; i++) {
            this.products.push(new Product(res['payload'][i].id, res['payload'][i].url, res['payload'][i].price, res['payload'][i].description))
          }
        } else {

        }
      }))
  }

  public postProduct(newCode: Object) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.post(environment.apiKey + 'product/insert', newCode, {
      headers: header
    })
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
        } else {
          throw new Error(data['message'])
        }
      }));
  }

  public deleteProduct(id: number) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.delete(environment.apiKey + 'product/delete/' + id, {
      headers: header
    })
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
        } else {
          throw new Error(data['message'])
        }
      }));
  }

  public updateProduct(updatedCode: Object) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.put(environment.apiKey + 'product/update', updatedCode, {
      headers: header
    })
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
        } else {
          throw new Error(data['message'])
        }
      }));
  }
}
