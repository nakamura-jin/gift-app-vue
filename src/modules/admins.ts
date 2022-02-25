export default class Admin {
  id: number;
  name: string;
  email: string;
  password: string;

  constructor(id: number, name: string, email: string, password: string) {
    this.id = id,
    this.name = name,
    this.email = email,
    this.password = password
  }
}

export interface LoginAdminResponse {
  loginData: Admin[]
  access_token: string;
  token_type: string;
  expires_in: number;
}