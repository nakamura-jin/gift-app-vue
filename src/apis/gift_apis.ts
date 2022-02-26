import axios from 'axios'
import Gift, { GiftResponse } from '@/modules/gifts'

export const createGift: (gift: Gift) => Promise<GiftResponse> = async (gift: Gift) => {
  const response = await axios.post('/gift', { purchase_id: gift.purchase_id, display: gift.display })
  return response.data.data
}

export const getSelectedGift: (url: string) => Promise<GiftResponse> = async (url: string) => {
  const response = await axios.get(url)
  return response.data.data
}