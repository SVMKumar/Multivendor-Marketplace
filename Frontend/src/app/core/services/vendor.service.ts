import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) {}

  getVendors(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/admin/vendors');
  }
  getPendingVendors(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/admin/pending-vendors');
  }
  approveVendor(vendorId: any, vendorObj: any): Observable<any> {
    return this.http.patch('http://localhost:3000/api/v1/admin/'+vendorId+'/status', vendorObj);
  }
  deleteVendor(vendorId: any): Observable<any> {
    return this.http.delete('http://localhost:3000/api/v1/vendors/'+ vendorId);
  }
  getVendor(vendorId: any): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/vendors/' + vendorId);
  }
  getProductsByVendorId(vendorId: any): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/vendors/' + vendorId + '/products');
  }
  getTopVendors(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/orders/vendors/top-vendors');
  }
  getPaymentMethods(vendorId: any): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/vendors/'+vendorId+'/payment-methods');
  }
  addPaymentMethods(vendorId : any,paymentMethods : any):Observable<any>{
    return this.http.patch('http://localhost:3000/api/v1/vendors/'+vendorId+'/payment-methods',paymentMethods);
  }
  deletePaymentMethods(vendorId : any,paymentMethods: any): Observable<any>{
    return this.http.patch('http://localhost:3000/api/v1/vendors/'+vendorId+'/delete-payment-methods',paymentMethods);
  }
  getPendingOrders(vendorId: any): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/vendors/' + vendorId + '/pending-orders');
  }
  getOrdersByVendor(vendorId: any): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/vendors/' + vendorId + '/orders');
  }
  getOutstandingPay(vendorId: any): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/vendors/' + vendorId + '/outstanding-payments');
  }
  getStats(vendorId: any): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/vendors/' + vendorId + '/stats');
  }
  updateVendor(vendorId: any, vendorObj: any): Observable<any> {
    return this.http.patch('http://localhost:3000/api/v1/vendors/' + vendorId, vendorObj);
  }
}
