import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GoogleApi } from '../../interfaces/google-api';

declare global {
  interface Window {
    google?: GoogleApi;
    onGoogleLibraryLoad?: () => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  private loadAPI: Promise<GoogleApi | null>;
  private platformId: object = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAPI = new Promise((resolve) => {
        window.onGoogleLibraryLoad = () => {
          if (window.google && window.google.accounts) {
            resolve(window.google);
          } else {
            console.warn('Google API loaded but accounts object is not available');
            resolve(null);
          }
        };
        this.loadScript();
      });
    } else {
      this.loadAPI = Promise.resolve(null);
    }
  }

  private loadScript(): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  jwtDecode(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    }
    console.warn('JWT decoding is not available on the server side');
    return null;
  }

  public async getGoogle(): Promise<GoogleApi | null> {
    return this.loadAPI;
  }
}
