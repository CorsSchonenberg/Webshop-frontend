import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {AuthService} from "../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../models/user.model";
import {NextidService} from "../service/nextid.service";

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

  onSubmit() {
    this.userSub = this.nextIdService.getNextUserId().subscribe(data => {
      this.newUserId = data;
      const user = new User(
        this.newUserId,
        this.signupForm.value.email,
        this.signupForm.value.password,
      );
      this.userService.setUser(user);
      this.authSub = this.authService.registerHandler().subscribe(() => {
        this.authSub.unsubscribe();
        this.router.navigate(['/shop'])
        return this._snackBar.open('Registering successful!', 'Nice!', {
          duration: 3000,
          horizontalPosition: 'right'
        });
      }, (error) => {
        if (error['statusText'] == "Unknown Error"){
          return this._snackBar.open("Error: 404 Not Found", 'Oh no..', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        }else {
          return this._snackBar.open(error, 'Oh no..', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        }
      })
      this.userSub.unsubscribe();
    }, (error) => {
      if (error['statusText'] == "Unknown Error"){
        return this._snackBar.open("Error: 404 Not Found", 'Oh no..', {
          duration: 3000,
          horizontalPosition: 'right'
        });
      }else {
        return this._snackBar.open(error, 'Oh no..', {
          duration: 3000,
          horizontalPosition: 'right'
        });
        alert(error)
      }
    })
  }


  ngOnInit(): void {

  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
