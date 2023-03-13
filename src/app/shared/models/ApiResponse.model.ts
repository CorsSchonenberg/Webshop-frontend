
export class ApiResponse {
  public code: string;
  public payload: any;
  public message: string;


  constructor(code: string, payload: any, message: string) {
    this.code = code;
    this.payload = payload;
    this.message = message;
  }
}
