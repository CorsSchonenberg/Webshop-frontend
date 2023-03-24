import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.scss']
})
export class PromocodeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onAddmode(): void {
    this.router.navigate(['/promocodeadd'])
  }
}
