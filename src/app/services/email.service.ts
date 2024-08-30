import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  apiUrl = 'http://localhost:3000/email'; // URL da api
  private httpClient = inject(HttpClient);

  // Método para enviar email
  sendEmail(data: string) {
    return this.httpClient.post(`${this.apiUrl}/send`, data);
  }

  // Método para verificar email
  verifyEmail(data: string) {
    return this.httpClient.post(`${this.apiUrl}/verify`, data);
  }

  // Método para reenviar email
  resendEmail(data: string) {
    return this.httpClient.post(`${this.apiUrl}/resend`, data);
  }

  // Método para confirmar email
  confirmEmail(data: string) {
    return this.httpClient.post(`${this.apiUrl}/confirm`, data);
  }
}
