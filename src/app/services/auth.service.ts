/* eslint-disable */

import { jwtDecode } from 'jwt-decode';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../interfaces/response-login';
import { ResponseCreateAccount } from '../interfaces/response-create-account';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;
  private http = inject(HttpClient);

  apiUrl = 'http://localhost:3000'; // URL da api

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Método para atribuir o token
  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('authToken', token);
    }
  }

  // Método para resgatar o token
  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // removeToken
  removeToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem('authToken');
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Método para fazer a autenticação
  login(data: { email: string; senha: string }): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/login`, data);
  }

  // Método para criar uma conta
  createAccount(_account: any): Observable<ResponseCreateAccount> {
    return this.http.post<ResponseCreateAccount>(`${this.apiUrl}/account`, _account);
  }

  // Método para sair do modo autenticado
  logout() {
    this.removeToken();
  }

  // Método para confirmar se está autenticado
  isLoggedIn(): boolean {
    if (!this.isBrowser) return false;
    const token = localStorage.getItem('token') || '';
    console.log(`Token: ${token}`);
    return !!token && this.isValidToken(token);
  }

  // Método para confirmar se o token é válido
  isValidToken(token: string): boolean {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp === undefined) return true;
      const expiryTime = decodedToken.exp * 1000;
      console.log(`
        Decodificando o token: ${token}
        Tempo de expiração: ${decodedToken.exp}
        Tempo de expiração em milissegundos: ${expiryTime}
        Token válido: ${Date.now() < expiryTime}
        Token decodificado: ${decodedToken}
        `);
      return Date.now() < expiryTime;
    } catch (error) {
      console.log(`Erro ao decodificar o Token: ${error}`);
      return false;
    }
  }
}
