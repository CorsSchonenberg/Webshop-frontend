import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {AddmodeComponent} from "./addmode/addmode.component";
import {EditmodeComponent} from "./editmode/editmode.component";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppModule} from "../app.module";

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

  ],
  exports: [
    AdminComponent,
    AddmodeComponent,
    EditmodeComponent,
  ]
})
export class AdminModule {
}
