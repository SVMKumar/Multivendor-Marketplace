import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  userId: string | null = null;
  userType: string | null = null;
  user: any = {};

  constructor(private ar: ActivatedRoute, private us: UserService, private vs: VendorService,private router: Router) {}

  ngOnInit(): void {
    this.userId = this.ar.snapshot.paramMap.get('id');
    this.userType = this.ar.snapshot.paramMap.get('userdetail');
    if (this.userType === 'customers') {
      this.us.getUser(this.userId).subscribe((data: any) => {
        this.user = data;
      }, (err: any) => {
        console.log(err);
      });
    }
    else if (this.userType === 'vendors') {
      this.vs.getVendor(this.userId).subscribe((data: any) => {
        this.user = data;
      }, (err: any) => {
        console.log(err);
      });
    }
  }

  deleteUser(userId: any){
    if (this.userType === 'customers') {
      this.us.deleteUser(userId).subscribe((data: any) => {
        this.router.navigateByUrl(`admin/user/${this.userType}`);
      }, (err: any) => {
        console.log(err);
      });
    }
    else if (this.userType === 'vendors') {
      this.vs.deleteVendor(userId).subscribe((data: any) => {
        this.router.navigateByUrl(`admin/user/${this.userType}`);
      }, (err) => {
        console.log(err);
      });
    }
  }

}
