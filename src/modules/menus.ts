export default class Menu {
  name: string;
  description: string;
  owner_id: number;
  genre: string;
  price: number;
  quantity: number;
  image: string;
  product_code? : number

  constructor(name: string, description: string, owner_id: number, genre: string, price: number, quantity: number, image: string, product_code? : number) {
    this.name = name,
    this.description = description,
    this.owner_id = owner_id,
    this.genre = genre,
    this.price = price,
    this.quantity = quantity,
    this.image = image,
    this.product_code = product_code
  }
}

export interface MenuResponse {
  id: number;
  name: string;
  description: string;
  owner_id: number;
  genre_name: string;
  genre_id: number;
  price: number;
  quantity: number;
  image: string;
  product_code: number;
  created_at: Date;
  updated_at: Date;
}

export interface Stock {
  product_code: number;
  name: string;
  stockQuantity: number;
  recievedQuantity?: number
}



