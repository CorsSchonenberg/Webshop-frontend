import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminComponent} from "../admin.component";
import {NgForm} from "@angular/forms";
import {NextidService} from "../../service/nextid.service";
import {ProductService} from "../../service/product.service";
import {Subscription} from "rxjs";
import {Product} from "../../models/product.model";
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

  onSubmit():void{
    this.nextIdSub = this.nextIdService.getNextProductId().subscribe(data => {
     this.productSub = this.productService.postProduct(new Product(
        data,
        this.addForm.value.url,
        this.addForm.value.price,
        this.addForm.value.name)
      ).subscribe( () => {
       this.productSub.unsubscribe()
       this._snackBar.open('New product has been added to shop', 'Nice!', {
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
