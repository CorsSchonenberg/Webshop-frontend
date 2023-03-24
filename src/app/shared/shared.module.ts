import {NgModule} from "@angular/core";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {HeaderComponent} from "../header/header.component";
import {RouterModule} from "@angular/router";
import {AlertComponent} from './alert/alert.component';
import {DiscountPipe} from "./discount.pipe";
import {PromocodeFormComponent} from './promocode-form/promocode-form.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HeaderComponent,
    AlertComponent,
    DiscountPipe,
    PromocodeFormComponent

  ],
  imports: [
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    HeaderComponent,
    AlertComponent,
    DiscountPipe,
    PromocodeFormComponent
  ]
})
export class SharedModule {
}
