import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../shared/user.service";
import {AuthService} from "../shared/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../models/user.model";
import {NextidService} from "../shared/nextid.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userSub: Subscription;
  authSub: Subscription;
  public showPassword: boolean = false;
  private newUserId = null;
  @ViewChild('f') signupForm: NgForm;

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private nextIdService: NextidService) {
  }

  onSubmit(): void {
    const user = new User(
      this.newUserId,
      this.signupForm.value.email,
      this.signupForm.value.password,
      false,
      this.signupForm.value.address
    );
    delete user.id;
    this.authSub = this.authService.registerHandler(user).subscribe({
      next: () => {
        let snackBarRef = this._snackBar.open("Succesfully logged in!", 'Nice!', {
          duration: 1000,
          horizontalPosition: 'right'
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.authSub.unsubscribe();
          this.router.navigate(['/shop'])
        });
      },
      error: err => {
        this.authSub.unsubscribe();
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
