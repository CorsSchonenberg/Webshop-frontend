import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NextidService {
  private nextUserid: number;
  private nextProductid: number;
  private nextOrderid: number;
  private nextPromoCodeid: number;
  constructor(private http: HttpClient) {
  }

  getNextEmployeeId() {
    return this.http.get(  'http://localhost:8080/api/v1/nextid/user')
      .pipe(map(res => {
          this.nextUserid = res['payload'];
          return this.nextUserid;
        }
      ));
  }
  getNextReservationId() {
    return this.http.get('http://localhost:8080/api/v1/nextid/order')
      .pipe(map(res => {
          this.nextOrderid = res['payload'];
          return this.nextOrderid;
        }
      ));
  }

  getNextVisitId() {
    return this.http.get('http://localhost:8080/api/v1/nextid/product')
      .pipe(map(res => {
          this.nextProductid = res['payload'];
          return this.nextProductid;
        }
      ));
  }

  getNextChargingStationId() {
    return this.http.get('http://localhost:8080/api/v1/nextid/promocode')
      .pipe(map(res => {
          this.nextPromoCodeid = res['payload'];
          return this.nextPromoCodeid;
        }
      ));
  }
}
