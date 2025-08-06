import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { VendorLayoutComponent } from './vendor-layout/vendor-layout.component';

const routes: Routes = [
    {path: 'admin',component: AdminLayoutComponent},
    {path: 'customer/:id',component: CustomerLayoutComponent},
    {path: 'vendor/:id', component: VendorLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }