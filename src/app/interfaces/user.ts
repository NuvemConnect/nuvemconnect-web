export interface User {
  nome?: string;
  email: string;
  senha: string;
  token?: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
