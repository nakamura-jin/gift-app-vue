import axios from 'axios'


export interface StripeForm {
  user_id: number;
  menu_id: string;
  quantity: number;
}

export interface PurchaseResponse {
  id: number;
  user_id: number;
  menu_id: string;
  quantity: number;
  crated_at: Date;
  updated_at: Date;
}

export const Purchase: (params: StripeForm) => Promise<PurchaseResponse> = async (params: StripeForm) => {
  const response = await axios.post('/purchase', { user_id: params.user_id, menu_id: params.menu_id, quantity: params.quantity })
  return response.data.data
}


export const PaymentCheckOut: (params: StripeForm) => Promise<string> = async (params: StripeForm) => {
  const response = await axios.get(`/checkout/${params.user_id}/${params.menu_id}/${params.quantity}`)
  const sessionId = response.data.id
  return sessionId
}


export const getPurchase: (purchase_id: string) => Promise<PurchaseResponse> = async (purchase_id: string) => {
  const response = await axios.get(`/purchase/${purchase_id}`)
  return response.data.data
}


export interface PurchaseParams {
  id: string;
  display: number;
}

export const updatePurchase: (params: PurchaseParams) => Promise<PurchaseResponse> = async (params: PurchaseParams) => {
  const response = await axios.put(`/purchase/${params.id}`, { display: params.display })
  return response.data.data
}

export const sendMail: ( url: string ) => Promise<string> = async ( url: string ) => {
  const response = await axios.post('/send', { url: url } )
  return response.data.data
}

export const getPurchasedUrl: (url: string) => Promise<PurchaseResponse> = async (url: string) => {
  const response = await axios.get(`/purchase/product/${url}`)
  return response.data.data
}