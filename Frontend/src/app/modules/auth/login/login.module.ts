import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { VendorLoginComponent } from './vendor-login/vendor-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CustomerLoginComponent,
    VendorLoginComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    CustomerLoginComponent,
    VendorLoginComponent,
    AdminLoginComponent
  ]
})
export class LoginModule { }