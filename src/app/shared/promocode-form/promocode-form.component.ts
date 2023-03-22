import {Component, OnInit, ViewChild} from '@angular/core';
import {PromocodeService} from "../promocode.service";
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-promocode-form',
  templateUrl: './promocode-form.component.html',
  styleUrls: ['./promocode-form.component.scss']
})
export class PromocodeFormComponent implements OnInit {
  promoCodeSub: Subscription;
  @ViewChild('f') codeForm: NgForm;

  constructor(private promocodeService: PromocodeService,
              private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.promoCodeSub = this.promocodeService.checkIfCodeIsValid(this.codeForm.value.code).subscribe({
      next: () => {
        let snackBarRef = this.snackBar.open("Your promocode has been selected!", 'Nice!', {
          duration: 1000,
          horizontalPosition: 'right'
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.promoCodeSub.unsubscribe();
          this.resetPage();
        });
      }, error: err => {
        if (err['status'] === 401) {
          return this.promocodeService.errorHandler("Error 401: Not authorized");
        } else if (err['statusText'] === "Unknown Error") {
          return this.promocodeService.errorHandler("Error 404: Not found");
        } else this.promocodeService.errorHandler(err);
        this.promoCodeSub.unsubscribe();
      }
    })
  }

  resetPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/cart'], {
      relativeTo: this.route
    })
  }

}
