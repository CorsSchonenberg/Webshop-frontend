export class User {
  public id: number;
  public email: string;
  public password: string;
  public admin: boolean;
  public address: string;


  constructor(id: number, email: string, password: string, admin: boolean, address: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.admin = admin;
    this.address = address;
  }
}
