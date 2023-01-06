import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";
import {map} from "rxjs";
import {PromoCode} from "../models/promocode.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public cart: Product[] = [];
  public products: Product[] = [];

  constructor(private http: HttpClient) { }

  public getAllProducts() {
    return this.http.get('http://localhost:8080/api/v1/product')
      .pipe(map(res => {
        if (res['code'] === 'ACCEPTED') {
          console.log(res)
          for (let i = 0; i < res['payload'].length; i++) {
            this.products.push(new Product(res['payload'][i].id, res['payload'][i].url, res['payload'][i].price, res['payload'][i].description))
          }
        } else {
          throw new Error(res['message'])
        }
      }))
  }

  public postProduct(newCode: Object) {
    return this.http.post('http://localhost:8080/api/v1/product/insert', newCode)
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          console.log(data['message'])
        } else {
          throw new Error(data['message'])
        }
      }));
  }

  public deleteProduct(id: number) {
    return this.http.delete('http://localhost:8080/api/v1/product/delete/' + id)
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          console.log(data['message'])
        } else {
          throw new Error(data['message'])
        }
      }));
  }

  public updateProduct(updatedCode: Object) {
    return this.http.put('http://localhost:8080/api/v1/product/update', updatedCode)
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          console.log(data['message'])
        } else {
          throw new Error(data['message'])
        }
      }));
  }
}
