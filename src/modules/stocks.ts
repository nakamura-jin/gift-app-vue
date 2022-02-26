export default class Stock {
  id: number;
  owner_id: number
  product_code: number;
  name: string;
  stockQuantity: number;
  recievedQuantity?: number

  constructor(id: number, owner_id: number, product_code: number, name: string, stockQuantity: number, recievedQuantity?: number) {
    this.id = id;
    this.owner_id = owner_id;
    this.product_code =  product_code;
    this.name = name;
    this.stockQuantity = stockQuantity;
    this.recievedQuantity = recievedQuantity
  }
}


export interface StockResponse {
  id: number;
  owner_id: number;
  product_code: number;
  name: string;
  stockQuantity: number;
  recievedQuantity?: number
}