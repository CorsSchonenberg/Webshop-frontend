import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminComponent} from "../admin.component";
import {NgForm} from "@angular/forms";
import {NextidService} from "../../shared/nextid.service";
import {ProductService} from "../../shared/product.service";
import {Subscription} from "rxjs";
import {Product} from "../../shared/models/product.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-addmode',
  templateUrl: './addmode.component.html',
  styleUrls: ['./addmode.component.scss']
})
export class AddmodeComponent implements OnInit {

  @ViewChild('f') addForm: NgForm;
  nextIdSub: Subscription;
  productSub: Subscription;

  constructor(private nextIdService: NextidService,
              private productService: ProductService,
              private _snackBar: MatSnackBar) {

  }


  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("Test")
    let product = new Product(
      null,
      this.addForm.value.url,
      this.addForm.value.price,
      this.addForm.value.name)
    delete product.id;

    this.productSub = this.productService.postProduct(product).subscribe({
      next: () => {
        this._snackBar.open('Your order has been handled', 'Nice!', {
          duration: 3000,
          horizontalPosition: 'right'
        });
        this.productSub.unsubscribe();
      }, error: err => {
        this.productSub.unsubscribe();
        if (err['status'] === 401) {
          return this.productService.errorHandler("Error 401: Not authorized");
        } else if (err['statusText'] === "Unknown Error") {
          return this.productService.errorHandler("Error 404: Not found");
        } else this.productService.errorHandler(err);
      }
    })
  }
}
