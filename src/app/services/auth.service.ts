/* eslint-disable */

import { jwtDecode } from 'jwt-decode';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { gapi, loadClientAuth2, loadGapiInsideDOM } from 'gapi-script';

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
    return this.http.post(`${this.apiUrl}/api/auth/login`, data);
  }

  createAccount(_account: any) {
    return this.http.post(`${this.apiUrl}/api/users`, _account);
  }

  logout() {
    return localStorage.removeItem('token');
  }

  async initializeGoogleSignIn() {
    await loadGapiInsideDOM();
    await loadClientAuth2(
      gapi,
      '615624047539-etnq4l44h7sc6tps64oq1prsapvc3evi.apps.googleusercontent.com',
      'lauro2007@gmail.com'
    );
  }

  signInWithGoogle() {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then((googleUser: any) => {
        const idToken = googleUser.getAuthResponse().id_token;

        // Enviar o token para o backend
        this.http.post(`${this.apiUrl}/api/auth/google`, { idToken }).subscribe(
          (response: any) => {
            // Tratar a resposta do backend (ex: armazenar token JWT, redirecionar)
            localStorage.setItem('token', response.token);
            console.log('Login com Google bem-sucedido:', response);
          },
          (error: any) => {
            // Tratar erros
            console.log('Erro ao fazer login com Google:', error);
            gapi.auth2.getAuthInstance().signOut();
          }
        );
      });
  }
}
