import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AuthService} from './auth.service';
import {UserService} from "./user.service";

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    if (this.userService.getUser().admin) {
      return true;
    } else {
      return this.router.createUrlTree(['/shop']);
    }


  }
}
