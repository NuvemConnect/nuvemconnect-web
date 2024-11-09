/* eslint-disable */

import { jwtDecode } from 'jwt-decode';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../../interfaces/response-login';
import { ResponseCreateAccount } from '../../interfaces/response-create-account';
import { ResponseForgotPassword } from '../../interfaces/response-forgot-password';
import { User } from '../../interfaces/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId: string = environment.googleClientId;
  private redirectUrl: string = environment.urlCallback;
  private isBrowser: boolean;
  private http = inject(HttpClient);

  readonly apiUrl = environment.baseUrl; // https://nuvemconnectapi.seronsoftware.com // http://localhost:3000

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setUser(user: User) {
    if (this.isBrowser) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  // Método para atribuir o token
  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
  }
  setNome(nome: string): void {
    if (this.isBrowser) {
      localStorage.setItem('nome', nome);
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
      return localStorage.getItem('authToken');
    }
    return null;
  }

  getEmail(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('email');
    }
    return null;
  }

  getNome(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('nome');
    }
    return null;
  }

  getUser() {
    if (this.isBrowser) {
      const user = localStorage.getItem('user');

      if (user) {
        return JSON.parse(user);
      }
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
    return this.getUser().token !== null;
  }

  // Método para fazer a autenticação
  login(email: string, password: string): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/account/login`, { email, password });
  }

  iniciarGoogleLogin() {
    // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.clientId}&redirect_uri=${this.redirectUrl}/auth-callback&response_type=code&scope=email%20profile`;
    const authUrl =
      'https://accounts.google.com/o/oauth2/v2/auth?client_id=671369799944-tor57f5l651r2kc4move6losih3p20cu.apps.googleusercontent.com&redirect_uri=http://localhost:4200/auth-callback&response_type=code&scope=email%20profile';
    window.location.href = authUrl;

    return [] as unknown as Observable<any>;
  }

  // Método para criar uma conta
  createAccount(
    name: string,
    isActive: boolean = false,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Observable<ResponseCreateAccount> {
    return this.http.post<ResponseCreateAccount>(`${this.apiUrl}/account`, {
      name,
      isActive,
      email,
      password,
      passwordConfirmation
    });
  }

  forgotPassword(email: string): Observable<ResponseForgotPassword> {
    return this.http.post<ResponseForgotPassword>(`${this.apiUrl}/account/request-password-reset`, {
      email
    });
  }

  resetPassword(
    token: string,
    tokenUUID: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/account/reset-password`, {
      token,
      tokenUUID,
      email,
      password,
      passwordConfirmation
    });
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
