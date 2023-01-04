import {Injectable} from '@angular/core';
import {Order} from "../models/order.model";
import {PromoCode} from "../models/promocode.model";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {

  public promoCodes: PromoCode[] = [];

  constructor(private http: HttpClient) {
  }

  public getAllCodes() {
    return this.http.get('http://localhost:8080/api/v1/promocode')
      .pipe(map(res => {
        if (res['code'] === 'ACCEPTED') {
          console.log(res)
          for (let i = 0; i < res['payload'].length; i++) {
            this.promoCodes.push(new PromoCode(res['payload'][i].id, res['payload'][i].discount, res['payload'][i].code))
          }
        } else {
          throw new Error(res['message'])
        }
      }))
  }

  public postCode(newCode: Object) {
    return this.http.post('http://localhost:8080/api/v1/promocode/insert', newCode)
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          console.log(data['message'])
        } else {
          throw new Error(data['message'])
        }
      }));
  }

  public deleteCode(id: number) {
    return this.http.delete('http://localhost:8080/api/v1/promocode/delete/' + id)
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          console.log(data['message'])
        } else {
          throw new Error(data['message'])
        }
      }));
  }

  public updateCode(updatedCode: Object) {
    return this.http.put('http://localhost:8080/api/v1/promocode/update', updatedCode)
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          console.log(data['message'])
        } else {
          throw new Error(data['message'])
        }
      }));
  }
}
