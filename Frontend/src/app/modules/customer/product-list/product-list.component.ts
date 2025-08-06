import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: any = null;
  category: any = null;
  identifier: any = null;
  vendorId: any = null;
  @Input() hideNavbar: boolean = false;
  constructor(private ps: ProductService, private ar: ActivatedRoute, private router: Router) {  }
  ngOnInit(): void {
    this.ar.paramMap.subscribe((params) => {
      this.category = params.get('category');
      this.identifier = params.get('identifier');
      this.vendorId = params.get('vendorId');
      if (this.vendorId) {
        this.ps.getProductsByVendor(this.vendorId).subscribe((data: any) => {
          this.products = data;
          for (let i = 0; i < this.products.length; i++) {
            this.ps.getReviewByProduct(this.products[i].productId).subscribe((data: any) => {
              this.products[i].reviews = data;
              const totalRating = this.products[i].reviews.reduce((sum: any, review: any) => sum + review.rating, 0);
              this.products[i].averageRating = this.products[i].reviews.length ? totalRating / this.products[i].reviews.length : 0;
            }, (err: any) => {
              console.log(err);
            });
          }
        }, (err: any) => {
          console.log(err);
        });
      }
      else if (this.identifier) {
        this.ps.getProductBySearch(this.identifier).subscribe((data: any) => {
          this.products = data;
          for (let i = 0; i < this.products.length; i++) {
            this.ps.getReviewByProduct(this.products[i].productId).subscribe((data: any) => {
              this.products[i].reviews = data;
              const totalRating = this.products[i].reviews.reduce((sum: any, review: any) => sum + review.rating, 0);
              this.products[i].averageRating = this.products[i].reviews.length ? totalRating / this.products[i].reviews.length : 0;
            }, (err: any) => {
              console.log(err);
            });
          }
          console.log(this.products);
        }, (err: any) => {
          console.log(err);
        });
      }
      else if (! this.category && !this.products) {
        this.ps.getProducts().subscribe((data: any) => {
          this.products = data;
          for (let i = 0; i < this.products.length; i++) {
            this.ps.getReviewByProduct(this.products[i].productId).subscribe((data: any) => {
              this.products[i].reviews = data;
              const totalRating = this.products[i].reviews.reduce((sum: any, review: any) => sum + review.rating, 0);
              this.products[i].averageRating = this.products[i].reviews.length ? totalRating / this.products[i].reviews.length : 0;
            }, (err: any) => {
              console.log(err);
            });
          }
        }, (err: any) => {
          console.log(err);
        });
      }
      else {
        this.ps.getProductByCategory(this.category).subscribe((data: any) => {
          this.products = data;
          for (let i = 0; i < this.products.length; i++) {
            this.ps.getReviewByProduct(this.products[i].productId).subscribe((data: any) => {
              this.products[i].reviews = data;
              const totalRating = this.products[i].reviews.reduce((sum: any, review: any) => sum + review.rating, 0);
              this.products[i].averageRating = this.products[i].reviews.length ? totalRating / this.products[i].reviews.length : 0;
            }, (err: any) => {
              console.log(err);
            });
          }
        }, (err: any) => {
          console.log(err);
        });
      }
    });
  }
  goToProduct(productId: string) {
  this.router.navigate(['/home/productdetails', productId]);
  }
  getStars(rating: number): ('full' | 'half' | 'empty')[] {
    const stars: ('full' | 'half' | 'empty')[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = (rating - fullStars) >= 0.25 && (rating - fullStars) < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    if (hasHalfStar) {
      stars.push('half');
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push('empty');
    }
    return stars;
  }  
}