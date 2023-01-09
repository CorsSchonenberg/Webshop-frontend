import {Injectable} from '@angular/core';
import {Order} from "../models/order.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public orders: Order[] = [];

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  public getAllOrders() {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.get('http://localhost:8080/api/v1/order',{
      headers: header
    })
      .pipe(map(res => {
        if (res['code'] === 'ACCEPTED') {
          for (let i = 0; i < res['payload'].length; i++) {
            this.orders.push(new Order(res['payload'][i].id, res['payload'][i].productId, res['payload'][i].productAmount, res['payload'][i].userId))
          }
        } else {
          throw new Error(res['message'])
        }
      }))
  }

  public postOrder(newOrder: Object) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.post('http://localhost:8080/api/v1/order/insert', newOrder,{
      headers: header
    })
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          console.log(data['message'])
        } else {
          throw new Error(data['message'])
        }
      }));
  }

  public deleteOrder(id: number) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.delete('http://localhost:8080/api/v1/order/delete/' + id,{
      headers: header
    })
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          console.log(data['message'])
        } else {
          throw new Error(data['message'])
        }
      }));
  }

  public updateOrder(updatedOrder: Object) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.put('http://localhost:8080/api/v1/order/update', updatedOrder,{
      headers: header
    })
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          console.log(data['message'])
        } else {
          throw new Error(data['message'])
        }
      }));
  }
}
