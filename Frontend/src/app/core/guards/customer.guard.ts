import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  private checkCustomer(): boolean | UrlTree {
    if (this.authService.isLoggedIn() && this.authService.getUserRole() === 'customer') {
      return true;
    }
    console.log('Unauthorized access attempt - redirecting to login');
    return this.router.parseUrl('/auth/login/customer');
  }

  canActivate(): boolean | UrlTree {
    return this.checkCustomer();
  }

  canLoad(_route: Route, _segments: UrlSegment[]): boolean | UrlTree {
    return this.checkCustomer();
  }
}
