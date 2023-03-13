import {Injectable} from '@angular/core';
import {Order} from "../models/order.model";
import {PromoCode} from "../models/promocode.model";
import {map} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {

  public promoCodes: PromoCode[] = [];

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  public getAllCodes() {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.get(environment.apiKey + 'promocode', {
      headers: header
    })
      .pipe(map(res => {
        if (res['code'] === 'ACCEPTED') {
          for (let i = 0; i < res['payload'].length; i++) {
            this.promoCodes.push(new PromoCode(res['payload'][i].id, res['payload'][i].discount, res['payload'][i].code))
          }
        } else {
          throw new Error(res['message'])
        }
      }))
  }

  public postCode(newCode: Object) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.post(environment.apiKey + 'promocode/insert', newCode, {
      headers: header
    })
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
        } else {
          throw new Error(data['message'])
        }
      }));
  }

  public deleteCode(id: number) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.delete(environment.apiKey + 'promocode/delete/' + id, {
      headers: header
    })
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
        } else {
          throw new Error(data['message'])
        }
      }));
  }

  public updateCode(updatedCode: Object) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.put(environment.apiKey + 'promocode/update', updatedCode, {
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
