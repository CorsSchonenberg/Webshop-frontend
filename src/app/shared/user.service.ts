import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";
import {User} from "./models/user.model";

@Injectable({
    providedIn: "root"
  }
)
export class UserService {


  constructor(private http: HttpClient) {
  }

  setUser(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  getJWT(): string {
    return sessionStorage.getItem('jwt');
  }

  setJWT(jwt: string): void {
    sessionStorage.setItem('jwt', jwt);
  }

  destroyJWT(): void {
    sessionStorage.removeItem('jwt');
  }
  destroyUser(): void {
    sessionStorage.removeItem('user');
  }
}
