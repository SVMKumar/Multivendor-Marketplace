import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  id: string | null = null;
  users: any = [];

  constructor(private router: Router, private us: UserService, private ar: ActivatedRoute, private vs: VendorService) { }
  ngOnInit(): void {
    this.ar.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id === 'customers') {
        this.us.getUsers().subscribe((data: any) => {
          this.users = data;
        }, (err: any) => {
          console.log("Error Occured!!");
        });
      }
      else if (this. id === 'vendors') {
        this.vs.getVendors().subscribe((data) => {
          this.users = data;
        }, (err) => {
          console.log("Error occured");
        });
      }
      else {
        this.router.navigate(['admin/reports']);
      }
    });
  }

  viewUser(userId: string): void {
    this.router.navigateByUrl(`/admin/user/${this.id}/${userId}`);
  }

  deleteUser(userId: string): void {
    if (this.id === 'customers') {
      this.us.deleteUser(userId).subscribe((data: any) => {
        this.users = this.users.filter((user: any) => user._id !== userId);
      }, (err: any) => {
        console.log(err);
      });
    }
    else if (this.id === 'vendors') {
      this.vs.deleteVendor(userId).subscribe((data: any) => {
        this.users = this.users.filter((user: any) => user._id !== userId);
      }, (err) => {
        console.log(err);
      });
    }
  }
}
