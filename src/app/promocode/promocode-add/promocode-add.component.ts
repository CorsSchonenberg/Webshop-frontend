import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PromoCode} from "../../shared/models/promocode.model";
import {Subscription} from "rxjs";
import {PromocodeService} from "../../shared/promocode.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-promocode-add',
  templateUrl: './promocode-add.component.html',
  styleUrls: ['./promocode-add.component.scss']
})
export class PromocodeAddComponent implements OnInit {

  @ViewChild('f') addForm: NgForm;
  addModeSub: Subscription;
  constructor(private promoCodeService: PromocodeService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    console.log('submit')
    let discount = this.addForm.value.discount /100;
    let promoCode = new PromoCode(
      null,
      discount,
      this.addForm.value.code,
      this.addForm.value.name,
    );
    delete promoCode.id;
    this.addModeSub = this.promoCodeService.postCode(promoCode).subscribe({
      next: () => {
        this.snackBar.open('Product has been Added!', 'Nice!', {
          duration: 3000,
          horizontalPosition: 'right'
        });
        this.promoCodeService.promoCodes = []
        this.addModeSub.unsubscribe();
        this.router.navigate(['/promocode']);
      }, error: err => {
        this.addModeSub.unsubscribe();
        if (err['status'] === 401) {
          return this.promoCodeService.errorHandler("Error 401: Not authorized");
        } else if (err['statusText'] === "Unknown Error") {
          return this.promoCodeService.errorHandler("Error 404: Not found");
        } else this.promoCodeService.errorHandler(err);
      }
    }
    )
  }
  goBackButton(): void {
    this.router.navigate(['/promocode'])
  }
}
