import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {AuthService} from "../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginSubscription: Subscription;
  infoSubscription: Subscription;
  public showPassword: boolean = false;
  @ViewChild('f') signinForm: NgForm;

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
  }

  onSubmit() {
    let credentials = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    };
    this.loginSubscription = this.authService.loginHandler(credentials).subscribe(() => {
      this.infoSubscription = this.authService.infoHandler().subscribe(data => {
        // const employee = new Employee(
        //   data.id,
        //   data.firstname,
        //   data.lastname,
        //   data.phonenumber,
        //   data.email,
        //   data.password,
        //   data.isadmin
        // );
        // this.userService.setEmployee(employee);
        this.infoSubscription.unsubscribe();
        this.router.navigate(['/myreservation'])
      }, error => {
        if (error['statusText'] == "Unknown Error") {
          return this._snackBar.open("Error: 404 Not Found", 'Oh no..', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        } else {
          return this._snackBar.open(error, 'Oh no..', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        }
      });
      this.loginSubscription.unsubscribe();
    }, error => {
      console.log(error)
      if (error['statusText'] == "Unknown Error") {
        return this._snackBar.open('Error: 404 Not Found', 'Oh no..', {
          duration: 3000,
          horizontalPosition: 'right'
        });
      } else {
        return this._snackBar.open(error, 'Oh no..', {
          duration: 3000,
          horizontalPosition: 'right'
        });
      }
    });
  }


  ngOnInit(): void {

  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
