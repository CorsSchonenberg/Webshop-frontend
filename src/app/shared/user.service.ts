import {Injectable, Input} from "@angular/core";

import {map} from "rxjs";
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
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  getJWT():string {
    return localStorage.getItem('jwt');
  }

  setJWT(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }

  destroyJWT() {
    localStorage.removeItem('jwt');
  }
  destroyUser(){
    localStorage.removeItem('user')
  }

}
