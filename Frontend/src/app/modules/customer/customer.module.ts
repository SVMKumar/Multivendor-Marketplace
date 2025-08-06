import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    ProductListComponent,
    ProductDetailComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDividerModule,
    MatButtonModule,
   
  ],
  exports: [
    ProductListComponent
  ]
})
export class CustomerModule { }
