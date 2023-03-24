import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {catchError} from "rxjs";
import {PromocodeService} from "./promocode.service";

@Injectable({providedIn: "root"})
export class ShopResolverService implements Resolve<any> {

  constructor(private promoCodeService: PromocodeService) {
  }

  resolve() {
    this.promoCodeService.promoCodes = []
    return this.promoCodeService.getAllCodes()
      .pipe(
        catchError((e) => {
          return "Error has occured";
        }));
  }
}
