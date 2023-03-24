import {Injectable} from '@angular/core';
import {PromoCode} from "./models/promocode.model";
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";
import {ApiResponse} from "./models/ApiResponse.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {

  public promoCodes: PromoCode[] = [];
  public activeCode: PromoCode;

  constructor(private http: HttpClient,
              private userService: UserService,
              private snackBar: MatSnackBar) {
  }

  public getAllCodes(): Observable<void> {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.get<ApiResponse>(environment.apiKey + 'promocode', {
      headers: header
    })
      .pipe(map(res => {
        if (res.code === 'ACCEPTED') {
          for (let i = 0; i < res.payload.length; i++) {
            this.promoCodes.push(new PromoCode(
              res.payload[i].id,
              res.payload[i].discount,
              res.payload[i].code,
              res.payload[i].name,))
          }
        } else {
          throw new Error(res.message)
        }
      }))
  }

  public postCode(newCode: Object): Observable<void> {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.post<ApiResponse>(environment.apiKey + 'promocode/insert', newCode, {
      headers: header
    })
      .pipe(map(data => {
        if (data.code === 'ACCEPTED') {
        } else {
          throw new Error(data.message)
        }
      }));
  }

  public deleteCode(id: number): Observable<void> {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.delete<ApiResponse>(environment.apiKey + 'promocode/delete/' + id, {
      headers: header
    })
      .pipe(map(data => {
        if (data.code === 'ACCEPTED') {
        } else {
          throw new Error(data.message)
        }
      }));
  }

  public updateCode(updatedCode: Object) {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.put(environment.apiKey + 'promocode/update', updatedCode, {
      headers: header
    })
      .pipe(map(data => {
        let resData = new ApiResponse(
          data['code'],
          data['payload'],
          data['message']
        )
        if (resData.code === 'ACCEPTED') {
        } else {
          throw new Error(resData.message)
        }
      }));
  }

  public checkIfCodeIsValid(code: string): Observable<void> {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.post<ApiResponse>(environment.apiKey + 'promocode/checker', code, {
      headers: header
    })
      .pipe(map(data => {
        if (data.code === 'ACCEPTED') {
          console.log(data.payload)
          this.activeCode = data.payload;
        } else {
          throw new Error(data.message)
        }
      }));
  }

  errorHandler(message: string) {
    return this.snackBar.open(message, 'Oh no..', {
      duration: 3000,
      horizontalPosition: 'right'
    });
  }
}
