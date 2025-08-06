import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { VendorRegisterComponent } from './vendor-register/vendor-register.component';
import { FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CustomerRegisterComponent,
    VendorRegisterComponent
  ],
  imports: [
    CommonModule,
    FormControl,
    SharedModule
  ]
})
export class RegisterModule { }
