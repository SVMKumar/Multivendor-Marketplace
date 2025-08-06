import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { VendorService } from 'src/app/core/services/vendor.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  vendorId: any;
  token: any;
  decodedToken: any;
  products: any;

  pendingOrders: any = null;
  totalOrders: any = null;
  listings: any = null;
  outstandingPay: any = null;
  stats: any = null;
  lineChartData!: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
  scaleArrayBy10k(values: number[]): number[] {
    return values.map(value => value / 10000);
  };

  constructor(private vs: VendorService, private router: Router) {}

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    const payloadBase64 = this.token?.split('.')[1];
    if (payloadBase64) {
      const decodedPayload = atob(payloadBase64);
      this.decodedToken = JSON.parse(decodedPayload);
      this.vendorId = this.decodedToken.vendorId;
    }

    this.vs.getVendor(this.vendorId).subscribe(
      (data) => this.user = data,
      (err) => console.error(err)
    );

    this.vs.getProductsByVendorId(this.vendorId).subscribe(
      (data) => this.products = data,
      (err) => console.error(err)
    );

    this.vs.getPendingOrders(this.vendorId).subscribe((data: any) => {
      this.pendingOrders = data;
    });

    this.vs.getOrdersByVendor(this.vendorId).subscribe((data: any) => {
      this.totalOrders = data;
    });

    this.vs.getProductsByVendorId(this.vendorId).subscribe((data: any) => {
      this.listings = data;
    });

    this.vs.getOutstandingPay(this.vendorId).subscribe((data: any) => {
      this.outstandingPay = data.totalOutstanding;
    });

    this.vs.getStats(this.vendorId).subscribe((data: any) => {
      this.stats = data;
      this.lineChartData = {
        labels: this.stats.months,
        datasets: [
          {
            data: this.stats.pendingOrders,
            label: 'Pending Orders',
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            tension: 0.4,
            fill: true,
          },
          {
            data: this.stats.totalOrders,
            label: 'Total Orders',
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            tension: 0.4,
            fill: true,
          },
          {
            data: this.stats.listings,
            label: 'Listings',
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            tension: 0.4,
            fill: true,
          },
          {
            data: this.scaleArrayBy10k(this.stats.outstandingPay),
            label: 'Outstanding Pay (x10K)',
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
            tension: 0.4,
            fill: true,
          }
        ]
      }
    });
  }
}
