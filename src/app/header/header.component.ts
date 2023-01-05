import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  collapsed = true;


  constructor(private userService: UserService) {
  }

  onLogOut(){
    this.userService.setJWT("");
  }
}
