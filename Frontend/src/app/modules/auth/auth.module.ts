import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 

import { AuthRoutingModule } from './auth-routing.module';
import { LoginModule } from './login/login.module';
import { CustomerRegisterComponent } from './register/customer-register/customer-register.component';
import { VendorRegisterComponent } from './register/vendor-register/vendor-register.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CustomerRegisterComponent,
    VendorRegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    LoginModule,
    RouterModule,
    SharedModule
  ]
})
export class AuthModule { }

