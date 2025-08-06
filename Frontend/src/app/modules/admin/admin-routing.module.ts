import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { VendorApprovalComponent } from './vendor-approvals/vendor-approvals.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path: 'dashboard', component: ReportsComponent},
  {path: 'user/:id', component : UserListComponent, runGuardsAndResolvers: 'always'},
  {path: 'user/:userdetail/:id', component: UserDetailComponent},
  {path: 'vendor-approval', component: VendorApprovalComponent},
  {path: 'orders', component: OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
