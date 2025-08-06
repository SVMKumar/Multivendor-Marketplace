import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLoginComponent } from './login/customer-login/customer-login.component';
import { VendorLoginComponent } from './login/vendor-login/vendor-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { CustomerRegisterComponent } from './register/customer-register/customer-register.component';
import { VendorRegisterComponent } from './register/vendor-register/vendor-register.component';

const routes: Routes = [
  { path: 'login/customer', component: CustomerLoginComponent },
  { path: 'login/vendor', component: VendorLoginComponent },
  { path: 'login/admin-dashboard-123', component: AdminLoginComponent },
  { path: 'register/customer', component: CustomerRegisterComponent },
  { path: 'register/vendor', component: VendorRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

