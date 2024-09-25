/* eslint-disable */

import { jwtDecode } from 'jwt-decode';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../../interfaces/response-login';
import { ResponseCreateAccount } from '../../interfaces/response-create-account';
import { ResponseForgotPassword } from '../../interfaces/response-forgot-password';

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
      localStorage.setItem('token', token);
    }
  }
  setName(name: string): void {
    if (this.isBrowser) {
      localStorage.setItem('name', name);
    }
  }
  setEmail(email: string): void {
    if (this.isBrowser) {
      localStorage.setItem('email', email);
    }
  }

  // Método para resgatar o token
  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getEmail(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('email');
    }
    return null;
  }

  getName(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('name');
    }
    return null;
  }

  // removeToken
  removeToken(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Método para fazer a autenticação
  login(email: string, password: string): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/login`, { email, password });
  }

  // Método para criar uma conta
  createAccount(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Observable<ResponseCreateAccount> {
    return this.http.post<ResponseCreateAccount>(`${this.apiUrl}/account`, {
      name,
      email,
      password,
      passwordConfirmation
    });
  }

  forgotPassword(email: string): Observable<ResponseForgotPassword> {
    return this.http.post<ResponseForgotPassword>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reset-password`, { token, newPassword });
  }

  // Método para sair do modo autenticado
  logout() {
    this.removeToken();
  }

  // Método para confirmar se está autenticado
  isLoggedIn(): boolean {
    if (!this.isBrowser) return false;
    const token = localStorage.getItem('token') || '';
    return !!token && this.isValidToken(token);
  }

  // Método para confirmar se o token é válido
  isValidToken(token: string): boolean {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp === undefined) return true;
      const expiryTime = decodedToken.exp * 1000;
      return Date.now() < expiryTime;
    } catch (error) {
      console.log(`Erro ao decodificar o Token: ${error}`);
      return false;
    }
  }
}