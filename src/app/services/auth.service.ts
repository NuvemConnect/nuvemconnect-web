import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:3000/auth'; // URL da api

  private httpClient = inject(HttpClient);

  // Método para fazer login
  login(data: User) {
    data = { email: 'string', senha: 'string' };
    return this.httpClient.post(`${this.apiUrl}/login`, data);
  }

  // Método para fazer logout
  logout() {
    return this.httpClient.post(`${this.apiUrl}/logout`, {});
  }

  // Método para verificar token
  verifyToken() {
    return this.httpClient.get(`${this.apiUrl}/verify`);
  }

  // Método para registrar usuário
  register(data: User) {
    return this.httpClient.post(`${this.apiUrl}/register`, data);
  }

  // Método para recuperar senha
  recovery(data: User) {
    return this.httpClient.post(`${this.apiUrl}/recovery`, data);
  }
}
