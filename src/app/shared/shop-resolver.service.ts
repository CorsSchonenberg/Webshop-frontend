import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Product} from "./models/product.model";
import {ProductService} from "./product.service";
import {catchError, Subscription} from "rxjs";

@Injectable({providedIn: "root"})
export class ShopResolverService implements Resolve<any>{

  constructor(private productService: ProductService) {
  }

  resolve() {
    this.productService.products = []
    return this.productService.getAllProducts()
      .pipe(
        catchError((e) => {
          return "Error has occured";
        }));
  }

}
