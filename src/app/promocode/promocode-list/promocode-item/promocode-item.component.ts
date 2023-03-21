import {Component, Input, OnInit} from '@angular/core';
import {PromoCode} from "../../../shared/models/promocode.model";

@Component({
  selector: 'app-promocode-item',
  templateUrl: './promocode-item.component.html',
  styleUrls: ['./promocode-item.component.scss']
})
export class PromocodeItemComponent implements OnInit {
  @Input() promoCode: PromoCode;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
