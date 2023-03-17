import {NgModule} from "@angular/core";
import {SigninComponent} from "./signin/signin.component";
import {RegisterComponent} from "./register/register.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    SigninComponent,
    RegisterComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'signin', component: SigninComponent},
      {path: 'register', component: RegisterComponent},])
  ],
  exports: [
    SigninComponent,
    RegisterComponent,
  ]
})
export class AuthModule {
}
