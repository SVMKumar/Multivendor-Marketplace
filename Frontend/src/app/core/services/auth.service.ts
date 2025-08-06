import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerCustomer: Function = (customerObj: any): Observable<any> => {
    return this.http.post('http://localhost:3000/api/v1/auth/customer-signup', customerObj);
  }

  registerVendor: Function = (vendorObj: any): Observable<any> => {
    return this.http.post('http://localhost:3000/api/v1/auth/vendor-signup', vendorObj);
  }

  customerLogin: Function = (customerObj: any): Observable<any> => {
    return this.http.post('http://localhost:3000/api/v1/auth/customer-login', customerObj);
  }

  vendorLogin: Function = (vendorObj: any): Observable<any> => {
    return this.http.post('http://localhost:3000/api/v1/auth/vendor-login', vendorObj);
  }

  adminLogin: Function = (adminObj: any): Observable<any> => {
    return this.http.post('http://localhost:3000/api/v1/auth/admin-login', adminObj);
  }

  private getDecodedToken(): any {
    const token = sessionStorage.getItem('token');
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  }

  getUserRole: Function = (): string => {
    const decoded = this.getDecodedToken();
    return decoded?.role || '';
  }

  isLoggedIn: Function = (): boolean => {
    return !!this.getDecodedToken();
  }
}
