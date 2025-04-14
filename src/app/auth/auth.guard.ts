
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean | UrlTree {
 
    if (isPlatformBrowser(this.platformId)) {
      const userType = localStorage.getItem('userType');

      if (userType === 'admin' || userType === 'agent' || userType === 'buyer') {
        return true;
      }
    }


    return this.router.parseUrl('/login');
  }
}
