import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layouts-routing.module';
import { VendorLayoutComponent } from './vendor-layout/vendor-layout.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    VendorLayoutComponent,
    CustomerLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  exports:[
    CustomerLayoutComponent,
    VendorLayoutComponent
  ]
})
export class LayoutsModule { }
