import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() message: string;
  @Input() callbackFunction: () => void;
  @Output() close = new EventEmitter<void>();

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.close.emit();
  }

  onCallback():void {
    this.callbackFunction();
    this.onClose();
  }

}
