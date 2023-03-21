import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {AddmodeComponent} from "./addmode/addmode.component";
import {EditmodeComponent} from "./editmode/editmode.component";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppModule} from "../app.module";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../shared/auth.guard";
import {AdminGuard} from "../shared/admin.guard";

@NgModule({
  declarations: [
    AdminComponent,
    AddmodeComponent,
    EditmodeComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'edit', component: EditmodeComponent, canActivate: [AuthGuard, AdminGuard]},

    ])
  ],
  exports: [
    AdminComponent,
    AddmodeComponent,
    EditmodeComponent,
  ]
})
export class AdminModule {
}
