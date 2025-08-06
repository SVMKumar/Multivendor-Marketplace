import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'orders', component: OrdersComponent},
  { path:'payments',component: PaymentsComponent},
  {path:'product-add/:vendorId',component:ProductEditComponent},
  {path: 'product-list', component: ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
