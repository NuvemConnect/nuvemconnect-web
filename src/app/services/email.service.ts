/* eslint-disable */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  apiUrl = 'http://localhost:3000/'; // URL da api
  private httpClient = inject(HttpClient);
}
