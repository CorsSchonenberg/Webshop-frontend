import {Injectable} from '@angular/core';
import {Order} from "./models/order.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";
import {ApiResponse} from "./models/ApiResponse.model";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
              private userService: UserService,
              private _snackBar: MatSnackBar) {
  }

  public postOrder(newOrder: Object): Observable<void> {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.post<ApiResponse>(environment.apiKey + 'order/insert', newOrder, {
      headers: header
    })
      .pipe(
        map(data => {
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
}
