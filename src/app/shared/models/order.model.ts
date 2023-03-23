export class Order {
  public id: number;
  public productId: number;
  public productAmount: number;
  public price: number;
  public userId: number;


  constructor(id: number, productId: number, productAmount: number, price: number, userId: number) {
    this.id = id;
    this.productId = productId;
    this.productAmount = productAmount;
    this.price = price;
    this.userId = userId;
  }
}
