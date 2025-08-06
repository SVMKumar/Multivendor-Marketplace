import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { ReportsComponent } from './reports/reports.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorApprovalComponent } from './vendor-approvals/vendor-approvals.component';
import { MatIconModule } from '@angular/material/icon';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    ReportsComponent,
    VendorApprovalComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule

  ]
})
export class AdminModule { }
