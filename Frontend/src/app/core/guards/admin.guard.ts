import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  private checkAdmin(): boolean | UrlTree {
    if (this.authService.isLoggedIn() && this.authService.getUserRole() === 'admin') {
      return true;
    }
    console.log('Unauthorized access attempt - redirecting to login');
    return this.router.parseUrl('/home');
  }

  canActivate(): boolean | UrlTree {
    return this.checkAdmin();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.checkAdmin();
  }
}
