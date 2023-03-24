import {Component, Input, OnInit} from '@angular/core';
import {PromoCode} from "../../../shared/models/promocode.model";
import {PromocodeService} from "../../../shared/promocode.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-promocode-item',
  templateUrl: './promocode-item.component.html',
  styleUrls: ['./promocode-item.component.scss']
})
export class PromocodeItemComponent implements OnInit {
  @Input() promoCode: PromoCode;
  @Input() index: number;
  promoCodeSub: Subscription;

  constructor(private promoCodeService: PromocodeService,
              private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  onDelete(): void {


    this.promoCodeSub = this.promoCodeService.deleteCode(this.promoCode.id).subscribe({
      next: () => {
        this.promoCodeSub.unsubscribe();
        this.snackBar.open("The Promocode has been deleted", 'Nice!', {
          duration: 3000,
          horizontalPosition: 'right'
        });
        this.promoCodeService.promoCodes = [];
        this.resetPage()
      }, error: err => {
        this.promoCodeSub.unsubscribe();
        if (err['status'] === 401) {
          return this.promoCodeService.errorHandler("Error 401: Not authorized");
        } else if (err['statusText'] === "Unknown Error") {
          return this.promoCodeService.errorHandler("Error 404: Not found");
        } else this.promoCodeService.errorHandler(err);
      }
    })
  }

  resetPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/promocode'], {
      relativeTo: this.route
    })
  }
}
