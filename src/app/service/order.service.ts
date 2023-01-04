import { Injectable } from '@angular/core';
import {Order} from "../models/order.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public orders: Order[] = [];
  constructor(private http: HttpClient) { }

  public getAllOrders(){
    return this.http.get('http://localhost:8080/api/v1/order')
      .pipe(map(res => {
        if (res['code'] === 'ACCEPTED'){
        for (let i = 0; i < res['payload'].length; i++) {
          this.orders.push(new Order(res['payload'][i].id, res['payload'][i].productId, res['payload'][i].productAmount, res['payload'][i].userId))
        }} else {
          throw new Error(res['message'])
        }
      }))
  }
  public postOrder(newOrder: Object){
    return this.http.post('http://localhost:8080/api/v1/order/insert', newOrder)
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          console.log(data['message'])
        } else {
          throw new Error(data['message'])
        }
      }));
  }
  public deleteOrder(id: number) {
    return this.http.delete('http://localhost:8080/api/v1/order/delete/'+ id)
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          console.log(data['message'])
        } else {
          throw new Error(data['message'])
        }
      }));
  }
  public updateOrder(updatedOrder: Object){
    return this.http.put('http://localhost:8080/api/v1/order/update', updatedOrder)
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          console.log(data['message'])
        } else {
          throw new Error(data['message'])
        }
      }));
  }
}
