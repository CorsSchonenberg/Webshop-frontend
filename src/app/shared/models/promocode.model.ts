export class PromoCode {

  public id: number;
  public discount: number;
  public code: string;

  constructor(id: number, discount: number, code: string) {
    this.id = id;
    this.discount = discount;
    this.code = code;
  }
}
