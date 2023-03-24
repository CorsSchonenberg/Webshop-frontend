import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, Subscription} from "rxjs";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";
import {User} from "./models/user.model";
import {ApiResponse} from "./models/ApiResponse.model";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  infoSub: Subscription;

  constructor(private http: HttpClient,
              private userService: UserService,
              private _snackBar: MatSnackBar) {
  }

  registerHandler(user: User): Observable<void> {
    return this.http.post<HttpClient>(environment.apiKey + 'auth/register', user)
      .pipe(map(data => {
        const resData = new ApiResponse(
          data['code'],
          data['payload'],
          data['message'])
        if (resData.code === 'ACCEPTED') {
          this.userService.setJWT(resData.message);
          this.infoSub = this.infoHandler().subscribe({
            next: () => {
              this.infoSub.unsubscribe();
            },
            error: (err) => {
              this.infoSub.unsubscribe();
              if (err['status'] === 401) {
                return this.errorHandler("unauth");
              } else if (err['status'] === "Unknown Error") {
                return this.errorHandler("notfound");
              }
            }
          })
        } else {
          throw new Error(data['message'])
        }
      }));
  }


  login(email: string, password: string): Observable<void> {
    return this.http
      .post<HttpClient>(environment.apiKey + 'auth/login', {
          email,
          password
        }
      ).pipe(
        map(data => {
          const resData = new ApiResponse(
            data['code'],
            data['payload'],
            data['message'])
          if (resData.code === 'ACCEPTED') {
            this.userService.setJWT(resData.message);
            this.infoHandler().subscribe({
              error: (err) => {
                if (err['status'] === 401) {
                  return this.errorHandler("Error 401: Not authorized");
                } else if (err['status'] === "Unknown Error") {
                  return this.errorHandler("Error 404: Not found");
                }
              }
            })
          } else {
            throw new Error(data['message'])
          }
        }));
  }

  infoHandler(): Observable<void> {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.get<HttpClient>(environment.apiKey + 'auth/info',
      {
        headers: header
      }).pipe(
      map(data => {
        const resData = new ApiResponse(
          data['code'],
          data['payload'],
          data['message'])
        if (data['code'] === 'ACCEPTED') {
          const user = new User(
            resData.payload.id,
            resData.payload.email,
            resData.payload.password,
            resData.payload.admin,
            resData.payload.address
          );
          this.userService.setUser(user);
        } else {
          throw new Error(resData.message)
        }
      }))
  }

  errorHandler(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this._snackBar.open(message, 'Oh no..', {
      duration: 3000,
      horizontalPosition: 'right'
    });
  }
}
