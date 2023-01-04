import {Injectable, Input} from "@angular/core";

import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";


@Injectable({
    providedIn: "root"
  }
)
export class UserService {
  employee: User;


  constructor(private http: HttpClient) {
  }

  setEmployee(employee: User): void {
    this.employee = employee;
  }

  getEmployee(): User {
    return this.employee;
  }

  getJWT():string {
    return localStorage.getItem('jwt');
  }

  setJWT(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }

}
