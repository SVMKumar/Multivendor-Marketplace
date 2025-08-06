import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { VendorService } from 'src/app/core/services/vendor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: string = '';
  name: string = 'Guest';
  cartSize: number = 0;
  customerId: string | null = null;
  vendorId: string | null = null;
  adminId: string | null = null;
  searchForm: FormGroup = new FormGroup({});
  user: any = null;
  userId: any = null;
  editableUser: any = {};

  constructor(private us: UserService, private router: Router, private vs: VendorService, private fb: FormBuilder, private ps: ProductService) {}

  private getDecodedToken(): any {
    const token = sessionStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group(
      {identifier: ['', [Validators.required]]}
    );

    const tokenObj = this.getDecodedToken();
    if (tokenObj) {
      this.role = tokenObj.role;
      this.customerId = tokenObj.customerId || null;
      this.userId = tokenObj.customerId || null;
      this.vendorId = tokenObj.vendorId || null;
      this.userId = tokenObj.vendorId || null;
      this.adminId = tokenObj.adminId || null;
      this.userId = tokenObj.adminId || null;

      if (this.role === 'customer' && this.customerId) {
        this.us.getUser(this.customerId).subscribe((data: any) => {
          this.name = data.name;
          this.user = data;
          this.cartSize = data.cart.length;
        }, (err: any) => {
          console.log(err);
        })
      }
      else if (this.role === 'vendor' && this.vendorId) {
        this.vs.getVendor(this.vendorId).subscribe((data: any) => {
          this.name = data.name;
          this.user = data;
        }, (err: any) => {
          console.log(err);
        })
      }
      else if (this.role === 'admin' && this.adminId) {
        this.us.getAdmin(this.adminId).subscribe((data: any) => {
          this.name = data.name;
          this.user = data;
        }, (err: any) => {
          console.log(err);
        })
      }
  }
}

  redirectToHome () {
    if (this.role === "customer") {
      this.router.navigate(['/home']);
    }
    else if (this.role === 'vendor') {
      this.router.navigate(['/vendor']);
    }
    else if (this.role === 'admin') {
      this.router.navigate(['admin/dashboard']);
    }
  }

  search () {
    const identifier = this.searchForm.value.identifier.toLowerCase();
    this.searchForm.reset();
    this.router.navigate(['home/products/search', identifier]);
  }

  onSave(updatedUserData: any) {
    if (!this.userId) return;

    this.us.updateUser(this.userId, updatedUserData).subscribe({
      next: (response: any) => {
        this.user = { ...this.user, ...updatedUserData };
        if (this.role == 'customer') {
          this.router.navigate(['/home/products']);
        }
        if (this.role == 'vendor') {
          this.router.navigate(['/vendor/listings']);
        }
      },
      error: (err: any) => {
        console.error('Failed to update user:', err);
      },
    });
  }
}
