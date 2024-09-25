import { Injectable } from '@angular/core';

export interface responseApi {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

// Define a interface para o objeto google
export interface GoogleApi {
  accounts: {
    id: {
      initialize: (config: any) => void; // eslint-disable-line
      renderButton: (element: HTMLElement, options: any) => void; // eslint-disable-line
    };
  };
}

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
  private loadAPI: Promise<GoogleApi>;

  constructor() {
    this.loadAPI = new Promise((resolve) => {
      window.onGoogleLibraryLoad = () => {
        if (window.google) {
          resolve(window.google);
        }
      };
      this.loadScript();
    });
  }

  private loadScript(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  jwtDecode(token: string) {
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

  public getGoogle(): Promise<GoogleApi> {
    return this.loadAPI;
  }
}
