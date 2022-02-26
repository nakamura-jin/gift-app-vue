import axios from 'axios';
import Menu, { MenuResponse } from '@/modules/menus'
import Stock from '@/modules/stocks'

// function createUserFromResponse(res: User): User {
//   return new User(res.id, res.name, res.email, res.password)
// }


export const getMenus: () => Promise<MenuResponse[]> = async () => {
  const response = await axios.get('/menu')
  return response.data.data
}

export const getOwnerMenus: (owner_id: string) => Promise<MenuResponse[]> = async (owner_id: string) => {
  const response = await axios.get(`/owner/menu/${owner_id}`)
  return response.data.data
}

export const getMenuDetail: (params: Menu) => Promise<Menu> = async (params: Menu) => {
  const response = await axios.get(`/menu/${params}`)
  return response.data.data
}


interface SendStock {
  stock: Stock[];
  owner_id: number
  product_code: number;
  name: string;
  stockQuantity: number;
  recievedQuantity?: number
}
export const updateStockQuantity: (params: Stock[]) => Promise<void> = async (params: any) => {
  const response = await axios.put(`/menu/${params[0].owner_id}/update_stock`, {
    stock: params
  })
  return response.data.data
}

// export interface createMenuParams {
//   name: string;
//   description: string;
//   price: number | null;
//   genre: string;
//   image: null | any;
//   owner_id: number | null,
//   area_id: number
// }

// Base menu create
// export const createMenu: (params: createMenuParams) => Promise<Menu> = async (params: createMenuParams) => {
//   const response = await axios.post('/menu', {
//     name: params.name,
//     description: params.description,
//     price: params.price,
//     genre: params.genre,
//     image: params.image,
//     owner_id: params.owner_id,
//     area_id: params.area_id
//   }, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   });
//   return response.data.data
// }


// create menu ver.1
// export const createMenu: (formData: any) => Promise<any> = async (formData: any) => {
//   const response = await axios.post('/menu', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   })
//   return response.data.data
// }


export interface createMenuParams {
  name: string;
  description: string;
  price: number | null;
  genre: string;
  image: never[];
  owner_id: number | null;
}

export interface sendDataParams extends FormData {
  append(name: keyof createMenuParams, value: string | Blob, fileName?: string): createMenuParams
}


export const createMenu: (formData: any) => Promise<any> = async (formData: any) => {
  const response = await axios.post('/menu', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data.data
}


// export interface UserCreateParams {
//   name: string
//   email: string
//   password: string
// }

// export const createUser: (params: UserCreateParams) => Promise<User> = async (params: UserCreateParams) => {
//   const res = await axios.post('/register', { name: params.name, email: params.email, password: params.password })
//   return createUserFromResponse(res.data)
// }

// export interface LoginParams {
//   email: string
//   password: string
//   type: string
// }


// export const login: (params: LoginParams ) => Promise<LoginUserResponse | LoginOwnerResponse | LoginAdminResponse> = async (params: LoginParams) => {
//   const response = await axios.post('/login', { email: params.email, password: params.password, type: params.type })
//   return response.data
// }

