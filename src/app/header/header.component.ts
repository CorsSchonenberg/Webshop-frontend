import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../service/user.service";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  collapsed = true;
  public cartNumber: number = 0;


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
    this.userService.setJWT("");
  }
}
