import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  token: any;
  customerId: any;
  products: any = null;
  showToast: boolean = false;
  shippingCharges: number = 50;
  deliveryAddress: string = '';
  responseMessage: string = '';
  danger: boolean = false;
  constructor(private us: UserService, private ps: ProductService, private os: OrderService, private router: Router, private location: Location) { }
  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    const payloadBase64 = this.token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const decodedToken = JSON.parse(decodedPayload);
    this.customerId = decodedToken.customerId;
    const navigationState: any = this.location.getState();
    this.products = navigationState?.variant ? [navigationState.variant] : null;
    this.us.getUser(this.customerId).subscribe((data: any) => {
      this.deliveryAddress = data.address;
    }, (err: any) => {
      console.log(err);
    });
    if (! this.products) {
      this.us.getCart(this.customerId).subscribe((data: any) => {
      this.products = data.cart;
      for (let i = 0; i < this.products.length; i++) {
        this.ps.getProductDetails(this.products[i].productId).subscribe((data: any) => {
          this.products[i].name = data.name;
          this.products[i].description = data.description;
          this.ps.getVariantDetails(this.products[i].productId, this.products[i].variantId).subscribe((data: any) => {
            this.products[i].color = data.color;
            this.products[i].size = data.size;
            this.products[i].price = data.price;
          })
        }, (err: any) => {
          console.log(err);
        })
      }
    }, (err: any) => {
      console.log(err);
    });
    }
  }

  placeOrder() {
    let order = {
      "customerId": this.customerId,
      "totalAmount": this.getTotalPrice(),
      "deliveryAddress": this.deliveryAddress,
      "products": this.products
    }
    this.os.placeOrder(order).subscribe((data: any) => {
      for (let i = 0; i < order.products.length; i++) {
        this.us.removeItem(this.customerId, order.products[i].productId, order.products[i].variantId).subscribe((data: any) => {
        }, (err: any) => {
          console.log(err);
        });
      }
      this.responseMessage = data.message;
    }, (err: any) => {
      this.danger = true;
      this.responseMessage = err.error.message;
    });
    this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
        this.danger = false;
        this.router.navigate(['/home']);
      }, 2000);
  }

  hideToast() {
    this.showToast = false;
  }

  getSubtotal(): number {
    return this.products.reduce((total: number, product: any) => {
      return total + (product.price * (product.quantity || 1));
    }, 0);
  }

  getDiscount(): number {
    return this.getSubtotal() * 0.10;
  }

  getTotalPrice(): number {
    return this.getSubtotal() - this.getDiscount() + this.shippingCharges;
  }

}