export default class gift {
  purchase_id: string;
  display: number;

  constructor(purchase_id: string, display: number) {
    this.purchase_id = purchase_id,
    this.display = display
  }
}

export interface GiftResponse {
  id: number;
  purchase_id: number;
  url: string;
  quantity: number;
  display: number;
  menu_image: string;
  menu_name: string;
  menu_price: number;
  owner_name: string;
  created_at: Date;
  updated_at: Date;
}