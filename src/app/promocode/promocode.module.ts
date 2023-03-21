import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../shared/auth.guard";
import {AdminGuard} from "../shared/admin.guard";
import {PromocodeComponent} from "./promocode.component";
import { PromocodeListComponent } from './promocode-list/promocode-list.component';
import { PromocodeItemComponent } from './promocode-list/promocode-item/promocode-item.component';



@NgModule({
  declarations: [
    PromocodeComponent,
    PromocodeListComponent,
    PromocodeItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'promocode', component: PromocodeComponent, canActivate: [AuthGuard, AdminGuard]},

    ])
  ],
  exports: [
    PromocodeComponent
  ]
})
export class PromocodeModule { }
