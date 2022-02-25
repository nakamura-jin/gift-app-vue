import axios from 'axios';
import User, { LoginUserResponse } from '@/modules/users'
import Owner, { LoginOwnerResponse } from '@/modules/owners'
import Admin, { LoginAdminResponse } from '@/modules/admins'


// function createUserFromResponse(res: User): User {
//   return new User(res.id, res.name, res.email, res.password)
// }


export const getLoginData: () => Promise<User[] | Owner[] | Admin[]> = async () => {
  const response = await axios.get('/me')
  return response.data
}

export interface UserCreateParams {
  name: string
  email: string
  password: string
}

export const createUser: (params: UserCreateParams) => Promise<User> = async (params: UserCreateParams) => {
  const response = await axios.post('/register', { name: params.name, email: params.email, password: params.password })
  return response.data
}

export interface LoginParams {
  email: string
  password: string
  type: string
}


export const login: (params: LoginParams ) => Promise<LoginUserResponse | LoginOwnerResponse | LoginAdminResponse> = async (params: LoginParams) => {
  const response = await axios.post('/login', { email: params.email, password: params.password, type: params.type })
  return response.data
}


