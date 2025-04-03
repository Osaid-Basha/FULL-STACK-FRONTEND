import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const userType = localStorage.getItem('userType');

    if (userType === 'admin' || userType === 'agent' || userType === 'buyer') {
      return true;
    }

    // لو ما في تسجيل دخول يرجعه على login
    return this.router.parseUrl('/login');
  }
}
