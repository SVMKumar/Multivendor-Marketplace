import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getImageUrl: Function = (image: Blob): Observable<any> => {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post('http://localhost:3000/api/v1/upload', formData);
  }

  listProduct: Function = (vendorId: any, productObj: any): Observable<any> => {
    return this.http.post('http://localhost:3000/api/v1/vendors/' + vendorId + '/products', productObj);
  }

  deleteProduct: Function = (vendorId: any, productId: any): Observable<any> => {
    return this.http.delete('http://localhost:3000/api/v1/vendors/' + vendorId + '/products/' + productId);
  }

  getProducts: Function = (): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/products');
  }

  getProductDetails: Function = (productId: any): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/products/' + productId);
  }

  getVariantDetails: Function = (productId: any, variantId: any): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/products/' + productId + '/variants/' + variantId);
  }

  getCategories: Function = (): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/categories');
  }

  getProductByCategory: Function = (category: any): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/categories/' + category);
  }

  getProductBySearch: Function = (identifier: any): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/products/search/' + identifier);
  }

  getTopProducts: Function = (): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/orders/products/top-products');
  }

  getProductsByVendor: Function = (vendorId: any): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/vendors/' + vendorId + '/products');
  }
  addReview: Function =(review: any): Observable<any> => {
    return this.http.post('http://localhost:3000/api/v1/reviews',review);
  }
  getReviewByProduct: Function = (productId: any): Observable<any> => {
    return this.http.get('http://localhost:3000/api/v1/reviews/products/' + productId);
  }
}
