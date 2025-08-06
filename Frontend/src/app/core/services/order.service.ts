import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder: Function = (order: any): Observable<any> => {
    return this.http.post('http://localhost:3000/api/v1/orders', order);
  }
  getOrders: Function = (customerId: any): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/customers/'+customerId+'/orders');
  }
  setOrderStatus: Function = (orderId: any, variantId: any, patchObj: any): Observable<any> => {
    return this.http.patch('http://localhost:3000/api/v1/orders/' + orderId + '/status/' + variantId, patchObj);
  }
  getAllOrders: Function = (): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/admin/orders');
  }
  getOrderById: Function = (orderId: any): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/orders/' + orderId);
  }
}
