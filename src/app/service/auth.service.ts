import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Subscription} from "rxjs";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  registerHandler() {
    return this.http.post(environment.apiKey + 'auth/register', this.userService.getUser())
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          this.userService.setJWT(data['message']);
        } else {
          throw new Error(data['message'])
        }
      }));
  }

  loginHandler(credentials: Object) {
    return this.http.post(environment.apiKey + 'auth/login', credentials)
      .pipe(map(data => {
        if (data['code'] === 'ACCEPTED') {
          this.userService.setJWT(data['message']);
        } else {
          throw new Error(data['message'])
        }
      }));
  }

  infoHandler() {
    let header = new HttpHeaders({"Authorization": "Bearer " + this.userService.getJWT()})
    return this.http.get(environment.apiKey + 'auth/info',
      {
        headers: header
      }).pipe(map(data => {
      if (data['code'] === 'ACCEPTED') {
        return data['payload'];
      } else {
        throw new Error(data['payload'])
      }
    }))
  }
}
