/* eslint-disable */

import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    //eslint-disable-line
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    //eslint-disable-line
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (token) {
        return true;
      }
      this.router.navigate(['login']);
      return false;
    }
    return false; // Add this line to return a default value
  }
}
