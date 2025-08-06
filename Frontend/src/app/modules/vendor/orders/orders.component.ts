import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  orders: any = null;
  token: any = null;
  vendorId: any = null;
  ordersLength: any = 0;

  constructor (private vs: VendorService, private os: OrderService) { }
  
  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      const payloadBase64 = this.token.split('.')[1];
      const decodedPayload = atob(payloadBase64);
      const decodedToken = JSON.parse(decodedPayload);
      this.vendorId = decodedToken.vendorId;
    }

    this.vs.getPendingOrders(this.vendorId).subscribe((data: any) => {
      this.orders = data;
      this.ordersLength = this.orders.length;
    });
  }

  cancelOrder(orderId: any, variantId: any) {
    let patchObj = {orderStatus: 'Cancelled'};
    this.os.setOrderStatus(orderId, variantId, patchObj).subscribe((data: any) => {
      this.ordersLength -= 1;
      this.orders = this.orders.map((order: any) => ({
        ...order,
        products: order.products.filter((product: any) => product.variantId !== variantId)
      }));
    }, (err: any) => {
      console.log(err);
    });
  }

  completeOrder(orderId: any, variantId: any) {
    let patchObj = {orderStatus: 'Completed'};
    this.os.setOrderStatus(orderId, variantId, patchObj).subscribe((data: any) => {
      this.orders = this.orders.map((order: any) => ({
        ...order,
        products: order.products.filter((product: any) => product.variantId !== variantId)
      }));
    }, (err: any) => {
      console.log(err);
    });
  }

}
