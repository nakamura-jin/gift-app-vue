import axios from 'axios';

export interface ListsResponse {
  id: number;
  name: string;
  email: string;
}

export const userLists: () => Promise<ListsResponse[]> = async () => {
  const response = await axios.get('/all_user')
  return response.data.data
}

export const ownerLists: () => Promise<ListsResponse[]> = async () => {
  const response = await axios.get('/owner')
  return response.data.data
}

export interface News {
  title: string;
  text: string;
}

export const createNews: (parama: News) => Promise<void> = async (params: News) => {
  const response = await axios.post('/create/news', {
    title: params.title,
    text: params.text
  })
  return response.data.data
}

export const getAllNews: () => Promise<News[]> = async () => {
  const response = await axios.get('/news')
  return response.data.data
}
