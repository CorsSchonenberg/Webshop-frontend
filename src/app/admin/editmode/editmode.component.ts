import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {ProductService} from "../../shared/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Product} from "../../shared/models/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-editmode',
  templateUrl: './editmode.component.html',
  styleUrls: ['./editmode.component.scss']
})
export class EditmodeComponent implements OnInit {

  @ViewChild('f', {static: false}) addForm: NgForm;

  productSub: Subscription;
  //productValues = [this.productService.productEdit.description, this.productService.productEdit.url, this.productService.productEdit.price]
  productValues = {
    name: null,
    price: null,
    url: null,
  }

  constructor(
              private productService: ProductService,
              private _snackBar: MatSnackBar,
              private router: Router) {

  }


  ngOnInit(): void {

    if (this.productService.productEdit === undefined) {
      return;
    }
    this.productValues = {
      name: this.productService.productEdit.description,
      price: this.productService.productEdit.price,
      url: this.productService.productEdit.url,
    }
    console.log();


  }

  onSubmit(): void {
    let product = new Product(
      this.productService.productEdit.id,
      this.addForm.value.url,
      this.addForm.value.price,
      this.addForm.value.name,
      true)

    this.productSub = this.productService.updateProduct(product).subscribe({
      next: () => {
        let snackBarRef = this._snackBar.open('Product has been edited!', 'Nice!', {
          duration: 1000,
          horizontalPosition: 'right'
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.productSub.unsubscribe();
          this.router.navigate(['/admin'])
        });
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
