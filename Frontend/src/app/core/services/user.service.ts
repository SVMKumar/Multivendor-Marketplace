import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }
  getUsers: Function = (): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/admin/customers');
  }

  deleteUser: Function = (userId: String) => {
    return this.http.delete('http://localhost:3000/api/v1/customers/'+userId);
  }

  getUser: Function = (userId: any): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/customers/'+userId);
  }

  addToCart: Function = (customerId: any, cartObj: any): Observable<any> => {
    return this.http.post('http://localhost:3000/api/v1/customers/' + customerId + '/cart', cartObj);
  }

  getCart: Function = (customerId: any): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/customers/' + customerId + '/cart');
  }

  updateQuantity: Function = (customerId: any, productId: any, variantId: any, body: any): Observable<any> => {
    return this.http.patch('http://localhost:3000/api/v1/customers/' + customerId + '/cart/' + productId + '/' + variantId, body);
  }

  removeItem: Function = (customerId: any, productId: any, variantId: any): Observable<any> => {
    return this.http.delete('http://localhost:3000/api/v1/customers/' + customerId + '/cart/' + productId + '/' + variantId);
  }

  getAdmin: Function = (adminId: any): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/admin/' + adminId);
  }

  updateUser: Function = (userId: any, userObj: any): Observable<any> => {
    return this.http.patch('http://localhost:3000/api/v1/customers/' + userId, userObj);
  }
}
