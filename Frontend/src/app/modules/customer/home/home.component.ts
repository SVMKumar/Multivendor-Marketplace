import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  topVendors: any = [];
  topDeals: any = [];
  vendorImages: any = ['vendor 1.jpg','vendor 2.jpg','vendor 3.jpg','vendor 4.jpg'];

  constructor (private ps: ProductService, private vs: VendorService, private router: Router) { };
  ngOnInit(): void {
    this.vs.getTopVendors().subscribe((data: any) => {
      this.topVendors = data.slice(0, 4);
    }, (err: any) => {
      console.log(err);
    });

    this.ps.getTopProducts().subscribe((data: any) => {
      this.topDeals = data.slice(0, 4);
    }, (err: any) => {
      console.log(err);
    });
  }

  goToProduct(productId: any) {
    this.router.navigate(['/home/productdetails', productId]);
  }

  benefits = [
    {
      icon: 'store',
      title: 'Open Your Online Store',
      description: 'Launch your store in minutes with our easy setup process'
    },
    {
      icon: 'public',
      title: 'Reach Millions of Shoppers',
      description: 'Access our global customer base and increase your sales'
    },
    {
      icon: 'inventory_2',
      title: 'Easy Inventory Management',
      description: 'Manage your products with our powerful tools'
    },
    {
      icon: 'payments',
      title: 'Secure Payments',
      description: 'Get paid reliably with our secure payment system'
    }
  ];
}
