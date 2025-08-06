import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  token: any;
  vendorId: any;
  products: any = [];
  constructor (private vs: VendorService, private ps: ProductService) { };
  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    const payloadBase64 = this.token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const decodedToken = JSON.parse(decodedPayload);
    this.vendorId = decodedToken.vendorId;
    this.vs.getProductsByVendorId(this.vendorId).subscribe((data) => {
      this.products = data;
    })
  }

  removeItem(product: any) {
    this.ps.deleteProduct(this.vendorId, product.productId).subscribe((data: any) => {
      this.products = this.products.filter((p: any) => p.productId !== product.productId);
    }, (err: any) => {
      console.log(err)
    })
  }
}