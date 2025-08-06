import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { VendorService } from 'src/app/core/services/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() editableUser: any = {};
  @Output() save = new EventEmitter<any>();
  
  userId: string | null = null;
  token: any;
  user: any = {};
  role: string = ''; // NEW

  constructor(
    private us: UserService,
    private ar: ActivatedRoute,
    private route: Router,
    private vs:VendorService
  ) {}

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    if (!this.token) {
      console.error('Token not found');
      return;
    }

    const payloadBase64 = this.token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const decodedToken = JSON.parse(decodedPayload);
    
    this.userId = decodedToken.customerId || decodedToken.vendorId;
    this.role = decodedToken.role;

    if (this.userId && this.role) {
      if (this.role === 'customer') {
        this.us.getUser(this.userId).subscribe({
          next: (data: any) => {
            this.user = data;
            this.editableUser = { ...this.user };
          },
          error: (err: any) => {
            console.error('Failed to fetch customer data:', err);
          }
        });
      } else if (this.role === 'vendor') {
        this.vs.getVendor(this.userId).subscribe({
          next: (data: any) => {
            this.user = data;
            this.editableUser = { ...this.user };
          },
          error: (err: any) => {
            console.error('Failed to fetch vendor data:', err);
          }
        });
      }
    } else {
      console.warn('Missing user ID or role');
    }
  }

  onSubmit() {
    if (this.editableUser.name && this.editableUser.address) {
      if(this.role=== 'customer' && this.userId){
        this.us.updateUser(this.userId, this.editableUser).subscribe({
          next: (updatedData: any) =>{
            this.save.emit(updatedData);
          },
          error: (err: any)=>{
            console.error("Error in updating Profile: ", err);
          }
        });
      }
      else if(this.role=== 'vendor' && this.userId){
        this.vs.updateVendor(this.userId, this.editableUser).subscribe({
          next: (UpdatedData : any) =>{
            this.save.emit(UpdatedData);
          },
          error: (err: any)=>{
            console.log("Error in updating Vendor Profile", err);
          }
        });
      }else{
        console.log("Error in updating Profile Details.")
      }
    }
  }
}
