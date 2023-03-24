import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../shared/user.service";
import {AuthService} from "../../shared/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginSubscription: Subscription;
  public showPassword: boolean = false;
  @ViewChild('f') signinForm: NgForm;

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
  }


  onSubmit(): void {
    this.loginSubscription = this.authService.login(
      this.signinForm.value.email,
      this.signinForm.value.password)
      .subscribe({
        next: () => {
          let snackBarRef = this.snackBar.open("Succesfully logged in!", 'Nice!', {
            duration: 1000,
            horizontalPosition: 'right'
          });
          snackBarRef.afterDismissed().subscribe(() => {
            this.loginSubscription.unsubscribe();
            this.router.navigate(['/'])
          });
        },
        error: err => {
          this.loginSubscription.unsubscribe();
          if (err['status'] === 401) {
            return this.authService.errorHandler("Error 401: Not authorized");
          } else if (err['statusText'] === "Unknown Error") {
            return this.authService.errorHandler("Error 404: Not found");
          } else this.authService.errorHandler(err);
        }
      })
  }


  ngOnInit(): void {

  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
