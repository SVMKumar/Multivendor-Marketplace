import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VendorGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  private checkVendor(): boolean | UrlTree {
    if (this.authService.isLoggedIn() && this.authService.getUserRole() === 'vendor') {
      return true;
    }
    return this.router.parseUrl('/auth/login/vendor');
  }

  canActivate(): boolean | UrlTree {
    return this.checkVendor();
  }

  canLoad(_route: Route, _segments: UrlSegment[]): boolean | UrlTree {
    return this.checkVendor();
  }
}
