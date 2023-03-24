import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  public cartNumber: number = 0;
  public isAdmin: boolean = false;
  public isAuthenticated: boolean;
  public loadAlert: boolean = false;


  constructor(private userService: UserService,
              private router: Router,
              private productService: ProductService) {
    productService.cart$.subscribe(data => {
        if (data === null || data === undefined) {
          return;
        }
        this.cartNumber = this.productService.products.length;
      }, error => {
        alert("Error Message");
      }
    )
  }

  ngOnInit(): void {
    if (this.userService.getUser() !== null) {
      this.isAuthenticated = true;
      this.isAdmin = this.userService.getUser().admin;
    }
  }

  onPress(): void {
    this.loadAlert = !this.loadAlert;
  }

  onLogOut(): void {
    this.userService.destroyJWT();
    this.userService.destroyUser();
    this.productService.resetCartStorage();
    this.productService.resetService();
    this.isAuthenticated = false;
    this.router.navigate(['/signin'])
  }


}
