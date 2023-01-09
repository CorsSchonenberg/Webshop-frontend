import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {NextidService} from "../../service/nextid.service";
import {ProductService} from "../../service/product.service";
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
    if (this.productService.productEdit === undefined) {
      return;
    }
    this.productValues = {
      name: this.productService.productEdit.description,
      price: this.productService.productEdit.price,
      url: this.productService.productEdit.url,
    }
  }

  onSubmit():void{
      this.productSub = this.productService.updateProduct(new Product(
        this.productService.productEdit.id,
        this.addForm.value.url,
        this.addForm.value.price,
        this.addForm.value.name)
      ).subscribe( () => {
        this.productSub.unsubscribe()
        this._snackBar.open('New product has been edited in the shop', 'Nice!', {
          duration: 3000,
          horizontalPosition: 'right'
        });
        this.addForm.resetForm();
      }, (error) => {
        if (error['statusText'] == "Unknown Error") {
          return this._snackBar.open("Error: 404 Not Found", 'Oh no..', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        } else {
          return this._snackBar.open(error, 'Oh no..', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        }
      })
  }
}
