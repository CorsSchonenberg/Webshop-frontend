export class PromoCode {

  public id: number;
  public discount: number;
  public code: string;
  public name: string


  constructor(id: number, discount: number, code: string, name: string) {
    this.id = id;
    this.discount = discount;
    this.code = code;
    this.name = name;
  }
}
