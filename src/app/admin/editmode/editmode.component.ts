import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {NextidService} from "../../shared/nextid.service";
import {ProductService} from "../../shared/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-editmode',
  templateUrl: './editmode.component.html',
  styleUrls: ['./editmode.component.scss']
})
export class EditmodeComponent implements OnInit {

  @ViewChild('f') addForm: NgForm;
  nextIdSub: Subscription;
  productSub: Subscription;
  //productValues = [this.productService.productEdit.description, this.productService.productEdit.url, this.productService.productEdit.price]
  productValues = {
    name: null,
    price: null,
    url: null,
  }
  constructor(private nextIdService: NextidService,
              private productService: ProductService,
              private _snackBar: MatSnackBar) {

  }


  ngOnInit(): void {
    if (this.productService.productEdit === undefined){
      return;
    }
    this.productValues = {
      name: this.productService.productEdit.description,
      price: this.productService.productEdit.price,
      url: this.productService.productEdit.url,
    }
    console.log(this.productValues);
  }

  onSubmit():void{
    let product = new Product(
      this.productService.productEdit.id,
      this.addForm.value.url,
      this.addForm.value.price,
      this.addForm.value.name)

    this.productSub = this.productService.updateProduct(product).subscribe({next: () => {
      this.productSub.unsubscribe();
      }, error: err => {
        this.productSub.unsubscribe();
        if (err['status'] === 401) {
          return this.productService.errorHandler("Error 401: Not authorized");
        } else if (err['statusText'] === "Unknown Error") {
          return this.productService.errorHandler("Error 404: Not found");
        } else this.productService.errorHandler(err);
      }})
  }
}
