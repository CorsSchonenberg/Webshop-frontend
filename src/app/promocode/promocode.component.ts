import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.scss']
})
export class PromocodeComponent implements OnInit {

  addMode: boolean = false;
  buttonTitle: string = "Add Mode +";
  constructor() { }

  ngOnInit(): void {
  }

  onAddmode(): void {
    this.addMode = !this.addMode;
    if (this.addMode) {
      this.buttonTitle = "Go Back";

    } else {
      this.buttonTitle = "Add Mode +";
    }
  }
}
