export interface User {
  nome?: string;
  email: string;
  senha: string;
  token?: string;
  UUID?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
