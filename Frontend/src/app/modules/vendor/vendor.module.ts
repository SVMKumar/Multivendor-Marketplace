import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentsComponent } from './payments/payments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgChartsModule } from 'ng2-charts';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';



@NgModule({
  declarations: [
    DashboardComponent,
    OrdersComponent,
    ProductListComponent,
    ProductEditComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatToolbarModule,
    MatIconModule,
    VendorRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    NgChartsModule
  ]
})
export class VendorModule { }
