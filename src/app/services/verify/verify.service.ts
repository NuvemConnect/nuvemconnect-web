import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private tokenUUIDSubject = new BehaviorSubject<string | null>(null);

  token$ = this.tokenSubject.asObservable();
  tokenUUID$ = this.tokenUUIDSubject.asObservable();

  setTokens(token: string, tokenUUID: string) {
    this.tokenSubject.next(token);
    this.tokenUUIDSubject.next(tokenUUID);
  }

  clearTokens() {
    this.tokenSubject.next(null);
    this.tokenUUIDSubject.next(null);
  }
}
