import { Component, OnInit } from '@angular/core';
import {PromoCode} from "../../shared/models/promocode.model";
import {PromocodeService} from "../../shared/promocode.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-promocode-list',
  templateUrl: './promocode-list.component.html',
  styleUrls: ['./promocode-list.component.scss']
})
export class PromocodeListComponent implements OnInit {
  promoCodes: PromoCode[] = this.promoCodeService.promoCodes;
  promocodeSub: Subscription;
  constructor(private promoCodeService: PromocodeService) { }

  ngOnInit(): void {
    if (this.promoCodeService.promoCodes.length !== 0) {
      return;
    }
    this.fetchPromoCodes();
  }
  fetchPromoCodes(): void {
    console.log(this.promoCodes)
    this.promocodeSub = this.promoCodeService.getAllCodes().subscribe({
      next: () => {
        this.promocodeSub.unsubscribe();
      },
      error: err => {
        this.promocodeSub.unsubscribe();
        if (err['status'] === 401) {
          return this.promoCodeService.errorHandler("Error 401: Not authorized");
        } else if (err['statusText'] === "Unknown Error") {
          return this.promoCodeService.errorHandler("Error 404: Not found");
        } else this.promoCodeService.errorHandler(err);
      }
    })
  }

}
