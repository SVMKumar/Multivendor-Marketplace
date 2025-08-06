import { Component, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  token:any;
  customerId:any;
  orders:any;
  ReviewForm!: FormGroup;
  selectedProduct: any = null;
  @ViewChild('reviewModal') reviewModal!: ElementRef;
  bootstrapModalInstance: any;
  selectedRating: any = 0;

  
  constructor(private os:OrderService,private fb: FormBuilder,private ps:ProductService, private router: Router){}
  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    const payloadBase64 = this.token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const decodedToken = JSON.parse(decodedPayload);
    this.customerId = decodedToken.customerId;
    this.os.getOrders(this.customerId).subscribe((data:any)=>{
      this.orders=data;
    },(err:any)=>{
      console.log(err);
    })
    this.ReviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      review: ['', [Validators.required]]
    });
  }

  //onsubmit
  onSubmit(): void {
    if (this.ReviewForm.valid && this.selectedProduct) {
      const formData = this.ReviewForm.value;
  
      const reviewPayload = {
        vendorId: this.selectedProduct.vendorId,
        customerId: this.customerId,
        productId: this.selectedProduct.productId,
        rating: formData.rating,
        review: formData.review
      };
  
      this.ps.addReview(reviewPayload).subscribe((data:any) => {
          console.log('Review saved to DB', data);
          this.ReviewForm.reset();
          this.selectedProduct = null;
          if (this.bootstrapModalInstance) {
            this.bootstrapModalInstance.hide();
            this.bootstrapModalInstance.dispose();
            this.bootstrapModalInstance = null;
          }
        },
       (err:any) => {
          console.error('Error submitting review:', err);
        }
      );
    } else {
      this.ReviewForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
  
  

  openReviewModal(product: any): void {
    this.selectedProduct = product;
    this.selectedRating = 0;
    this.ReviewForm.reset();

    if (this.bootstrapModalInstance) {
      this.bootstrapModalInstance.dispose();
      this.bootstrapModalInstance = null;
    }
  
    this.bootstrapModalInstance = new bootstrap.Modal(this.reviewModal.nativeElement, {
      backdrop: 'static',
      keyboard: true
    });
  
    this.bootstrapModalInstance.show();
  }
  
  reorder(product: any){
    this.ps.getVariantDetails(product.productId, product.variantId).subscribe((data: any) => {
      product.color = data.color;
      product.size = data.size;
      product.stock = data.stock;
      this.router.navigate(['/home/checkout'], { state: { variant: product }});
    });
  }

  setRating(rating: number) {
    this.selectedRating = rating;
    this.ReviewForm.patchValue({ rating });
  }

  cancelOrder(orderId: any, variantId: any) {
    let patchObj = {orderStatus: 'Cancelled'};
    for (let i = 0; i < this.orders.length; i++) {
      const order = this.orders[i];
  
      if (order._id === orderId) {
        for (let j = 0; j < order.products.length; j++) {
          const product = order.products[j];
  
          if (product.variantId === variantId) {
            product.orderStatus = 'Cancelled';
            break;
          }
        }
        break;
      }
    }
    this.os.setOrderStatus(orderId, variantId, patchObj).subscribe((data: any) => {
    }, (err: any) => {
      console.log(err);
    });
  }

  goToProduct(productId: any) {
    this.router.navigate(['/home/productdetails/', productId]);
  }
}
