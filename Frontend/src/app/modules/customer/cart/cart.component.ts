import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  token: any;
  customerId: any;
  products: any = [];
  totalAmount: number=0;
  constructor (private us: UserService, private ps: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    const payloadBase64 = this.token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const decodedToken = JSON.parse(decodedPayload);
    this.customerId = decodedToken.customerId;
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
            this.products[i].stock = data.stock;
            this.products[i].variantId = data._id;
            this.getTotalAmount();
          })
        }, (err: any) => {
          console.log(err);
        })
      }
    }, (err: any) => {
      console.log(err);
    })
  }

  removeItem(product: any) {
    this.us.removeItem(this.customerId, product.productId, product.variantId).subscribe((data: any) => {
      this.products = this.products.filter((p: any) => (p.variantId !== product.variantId));
      this.getTotalAmount();
    }, (err: any) => {
      console.log(err);
    })
  }

  increaseQuantity(product: any) {
    let body = {"value": 1};
    if (product.quantity === product.stock) {
      return;
    }
    this.us.updateQuantity(this.customerId, product.productId, product.variantId, body).subscribe((data: any) => {
      product.quantity = product.quantity + 1;
      this.getTotalAmount();
    }, (err: any) => {
      console.log(err);
    });
  }

  decreaseQuantity(product: any) {
    if (product.quantity === 1) {
      this.removeItem(product);
    }
    else {
      let body = {"value": -1};
    this.us.updateQuantity(this.customerId, product.productId, product.variantId, body).subscribe((data: any) => {
      product.quantity = product.quantity - 1;
      this.getTotalAmount();
    }, (err: any) => {
      console.log(err);
    });
    }
  }

  checkOut () {
    this.router.navigate(['/home/checkout']);
  }

  buyNow(product: any) {
    this.router.navigate(['/home/checkout'], {state: {variant: product}});
  }

  getTotalAmount() {
    this.totalAmount =0;
    for( let i=0;i< this.products.length;i++){
      const price = Number(this.products[i].price);
      const quantity = Number(this.products[i].quantity);
      if(!isNaN(price) && !isNaN(quantity)){
        this.totalAmount+=price*quantity;
      }
    }
  }
}
