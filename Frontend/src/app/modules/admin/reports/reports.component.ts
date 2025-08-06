import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { UserService } from 'src/app/core/services/user.service';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{

    customers: any = [];
    vendors: any = [];
    orders: any = [];
    topVendors: any = [];
    todayDate = new Date();


  constructor(private us: UserService, private vs: VendorService, private os: OrderService) {}
  ngOnInit(): void {
    this.todayDate = new Date();
      this.us.getUsers().subscribe((data: any) => {
        this.customers = data;
      }, (err: any) => {
        console.log(err);
      });
      this.vs.getVendors().subscribe((data: any) => {
        this.vendors = data;
      }, (err: any) => {
        console.log(err);
      });
      this.vs.getTopVendors().subscribe((data: any) => {
        this.topVendors = data;
      }, (err: any) => {
        console.log(err);
      });
      this.os.getAllOrders().subscribe((data: any) => {
        this.orders = data;
        this.orders.forEach((order: any) => {
          const statuses = order.products.map((p: any) => p.orderStatus);
          const allCompleted = statuses.every((status: any) => status === 'Completed');
          const allCancelled = statuses.every((status: any) => status === 'Cancelled');
          if (allCompleted) {
            order.status = 'Completed';
          } else if (allCancelled) {
            order.status = 'Cancelled';
          } else {
            order.status = 'Pending';
          }
        });

      }, (err: any) => {
        console.log(err);
      });
  }

}
