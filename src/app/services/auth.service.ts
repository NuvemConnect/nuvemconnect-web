/* eslint-disable */

import { jwtDecode } from 'jwt-decode';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;

  apiUrl = 'http://localhost:3000/'; // URL da api

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser) return false;
    const token = localStorage.getItem('token') || '';
    console.log(`Token: ${token}`);
    return !!token && this.isValidToken(token);
  }

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

  // Método para fazer login
  login(data: { email: string; senha: string }) {
    return new Promise((resolve) => {
      window.localStorage.setItem('token', data.email);
      resolve(true);
    });
  }

  createAccount(_account: any) {
    return new Promise((resolve) => resolve(true));
  }

  logout() {
    return localStorage.removeItem('token');
  }
}
