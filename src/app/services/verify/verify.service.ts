import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private tokenUUIDSubject = new BehaviorSubject<string | null>(null);
  private emailSubject = new BehaviorSubject<string | null>(null);

  token$ = this.tokenSubject.asObservable();
  tokenUUID$ = this.tokenUUIDSubject.asObservable();
  email$ = this.emailSubject.asObservable();


  setTokens(token: string, tokenUUID: string, email: string) {
    this.tokenSubject.next(token);
    this.tokenUUIDSubject.next(tokenUUID);
    this.emailSubject.next(email);
  }

  clearTokens() {
    this.tokenSubject.next(null);
    this.tokenUUIDSubject.next(null);
    this.emailSubject.next(null);
  }
}
