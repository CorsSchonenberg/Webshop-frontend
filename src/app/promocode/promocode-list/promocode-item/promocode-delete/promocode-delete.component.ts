import {Component, Input, OnInit} from '@angular/core';
import {PromocodeService} from "../../../../shared/promocode.service";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-promocode-delete',
  templateUrl: './promocode-delete.component.html',
  styleUrls: ['./promocode-delete.component.scss']
})
export class PromocodeDeleteComponent implements OnInit {
  @Input() id: number;
  promoCodeSub: Subscription;
  constructor(private promoCodeService: PromocodeService,
              private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  onDelete(): void {

    this.promoCodeSub = this.promoCodeService.deleteCode(this.id).subscribe({
      next: () => {
        this.promoCodeSub.unsubscribe();
        this.snackBar.open("The Promocode has been deleted", 'Nice!', {
          duration: 3000,
          horizontalPosition: 'right'
        });

        for (let i = 0; i < this.promoCodeService.promoCodes.length; i++) {
          if (this.promoCodeService.promoCodes[i].id === i ){
            this.promoCodeService.promoCodes.splice(i, 1);
          }
        }
        this.resetPage();
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
