export interface User {
  UUID?: number;
  name?: string;
  email: string;
  password: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
