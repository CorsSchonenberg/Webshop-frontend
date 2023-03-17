export class Product {
  public id: number;
  public url: string;
  public price: number;
  public description: string;
  public active: boolean;


  constructor(id: number, url: string, price: number, description: string, active: boolean) {
    this.id = id;
    this.url = url;
    this.price = price;
    this.description = description;
    this.active = active;
  }
}
