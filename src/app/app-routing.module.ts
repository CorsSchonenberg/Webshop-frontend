import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./start/start.component";
import {SigninComponent} from "./signin/signin.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path: '', component: StartComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'register', component: RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
