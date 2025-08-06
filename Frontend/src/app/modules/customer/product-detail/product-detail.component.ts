import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';

interface Review {
  customerName: string;
  createdAt: string;
  rating: number;
  review: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetails: any = {};
  variantDetails: any[] = [];
  selectedVariant: any = null;
  reviews: Review[] = [];
  visibleReviews: number = 3;

  customerId: string = '';
  productId: string | null= '';
  token: string | null = '';

  // Expose Math to template
  Math = Math;

  // Rating summary data
  averageRating: number = 0;
  ratingCountMap: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  totalRatings: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      const payloadBase64 = this.token.split('.')[1];
      const decodedPayload = atob(payloadBase64);
      const decodedToken = JSON.parse(decodedPayload);
      this.customerId = decodedToken.customerId;
    }

    this.route.paramMap.subscribe(params => {
      this.productDetails = {};
      this.variantDetails = [];
      this.selectedVariant = null;
      this.reviews = [];
      this.visibleReviews = 3;
      this.productId = params.get('id');
      this.productService.getProductDetails(this.productId).subscribe(
        (data: any) => {
          this.productDetails = data;
          const variantIds = data.variants || [];
          for (const variantId of variantIds) {
            this.productService.getVariantDetails(this.productId, variantId).subscribe(
              (variant: any) => {
                this.variantDetails.push(variant);
                if (!this.selectedVariant && variant.stock >= 1) {
                  this.selectedVariant = {
                    ...variant,
                    productId: this.productDetails.productId,
                    description: this.productDetails.description,
                    imageUrl: this.productDetails.imageUrl,
                    vendorId: this.productDetails.vendorId,
                    name: this.productDetails.name,
                    quantity: 1,
                    variantId: variant._id
                  };
                }
              },
              (err: any) => console.error(err)
            );
          }
        },
        (err: any) => console.error(err)
      );
  
      this.productService.getReviewByProduct(this.productId).subscribe(
        (data: Review[]) => {
          this.reviews = data;
          this.calculateRatingSummary();
        },
        (err: any) => console.error(err)
      );
    });
    
  }

  calculateRatingSummary() {
    this.ratingCountMap = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    this.totalRatings = this.reviews.length;

    this.reviews.forEach((review) => {
      const rating = review.rating;
      if (this.ratingCountMap[rating] !== undefined) {
        this.ratingCountMap[rating]++;
      }
    });

    const totalScore = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = this.totalRatings ? totalScore / this.totalRatings : 0;
  }

  selectVariant(variant: any) {
    this.selectedVariant = {
      ...variant,
      productId: this.productDetails.productId,
      description: this.productDetails.description,
      imageUrl: this.productDetails.imageUrl,
      vendorId: this.productDetails.vendorId,
      name: this.productDetails.name,
      quantity: 1,
      variantId: variant._id
    };
  }

  addToCart() {
    if (!this.selectedVariant) {
      alert('Please select a variant first!');
      return;
    }

    const cartObj = {
      variantId: this.selectedVariant._id,
      vendorId: this.productDetails.vendorId,
      productId: this.productId,
      productName: this.productDetails.productName,
      imageUrl: this.productDetails.imageUrl,
      quantity: 1
    };

    this.userService.addToCart(this.customerId, cartObj).subscribe(
      (res: any) => {
        this.snackBar.open(res.message || 'Added to cart', '✔️', { duration: 3000 });
      },
      (err: any) => console.error(err)
    );
  }

  buyNow() {
    if (!this.selectedVariant) {
      alert('Please select a variant first!');
      return;
    }

    this.router.navigate(['/home/checkout'], { state: { variant: this.selectedVariant } });
  }

  // Show all reviews when "Load More" is clicked
  loadMoreReviews() {
    this.visibleReviews = this.reviews.length;
  }
}
