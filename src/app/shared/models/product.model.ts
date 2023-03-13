export class Product {
  public id: number;
  public url: string;
  public price: number;
  public description: string;


  constructor(id: number, url: string, price: number, description: string) {
    this.id = id;
    this.url = url;
    this.price = price;
    this.description = description;
  }
}
