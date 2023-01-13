import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {environment} from "../../environments/environment";

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

  getNextUserId() {
    return this.http.get(environment.apiKey + 'nextid/user')
      .pipe(map(res => {
          this.nextUserid = res['payload'];
          return this.nextUserid;
        }
      ));
  }

  getNextOrderId() {
    return this.http.get(environment.apiKey + 'nextid/order')
      .pipe(map(res => {
          this.nextOrderid = res['payload'];
          return this.nextOrderid;
        }
      ));
  }

  getNextProductId() {
    return this.http.get(environment.apiKey + 'nextid/product')
      .pipe(map(res => {
          this.nextProductid = res['payload'];
          return this.nextProductid;
        }
      ));
  }

  getNextPromoCodeId() {
    return this.http.get(environment.apiKey + 'nextid/promocode')
      .pipe(map(res => {
          this.nextPromoCodeid = res['payload'];
          return this.nextPromoCodeid;
        }
      ));
  }
}
