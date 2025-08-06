import { Component } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  orders:any;
  constructor(private os:OrderService){}
  ngOnInit(): void {
    this.os.getAllOrders().subscribe((data:any)=>{
      this.orders=data;
      console.log(this.orders);
    },(err:any)=>{
      console.log(err);
    });
  }
}
