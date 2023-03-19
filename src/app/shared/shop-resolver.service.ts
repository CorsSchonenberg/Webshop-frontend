import {Injectable} from "@angular/core";
import { Resolve} from "@angular/router";
import {ProductService} from "./product.service";
import {catchError} from "rxjs";

@Injectable({providedIn: "root"})
export class ShopResolverService implements Resolve<any>{

  constructor(private productService: ProductService) {
  }

  resolve() {
    this.productService.adminProducts = []
    return this.productService.getAllProducts()
      .pipe(
        catchError((e) => {
          return "Error has occured";
        }));
  }

}
