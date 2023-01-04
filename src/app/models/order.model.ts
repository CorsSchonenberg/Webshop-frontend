export class Order {
  public id: number;
  public productId: number;
  public productAmount: number;
  public userId: number;

  constructor(id: number, productId: number, productAmount: number, userId: number) {
    this.id = id;
    this.productId = productId;
    this.productAmount = productAmount;
    this.userId = userId;
  }
}
