import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../shared/user.service";
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  collapsed: boolean = true;
  public cartNumber: number = 0;
  public isAdmin: boolean = false;
  public isAuthenticated: boolean;


  constructor(private userService: UserService,
              private productService: ProductService) {
    productService.cart$.subscribe(data => {
        this.cartNumber = data.length;
      }, error => {
        alert("Error Message");
      }
    )
  }

  onLogOut(){
    this.userService.destroyJWT();
    this.userService.destroyUser();
    this.isAuthenticated = false;
  }
  ngOnInit() {
    if (this.userService.getUser() !== null){
      this.isAuthenticated = true;
      this.isAdmin = this.userService.getUser().admin;
    }

  }
}
