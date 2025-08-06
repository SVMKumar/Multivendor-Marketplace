import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/core/services/vendor.service';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-vendor-layout',
  templateUrl: './vendor-layout.component.html',
  styleUrls: ['./vendor-layout.component.css']
})
export class VendorLayoutComponent implements OnInit {

  vendorId: string | null = null;
  token: any;
  vendor: any = {};
  userId: any = null;
  user: any = {};
  editableUser: any = {};

  constructor(private vs: VendorService, private router: Router) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    const payloadBase64 = this.token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const decodedToken = JSON.parse(decodedPayload);
    this.vendorId = decodedToken.vendorId;

    if (this.vendorId) {
      this.vs.getVendor(this.vendorId).subscribe((data: any) => {
        this.vendor = data;
        this.user = data;
      }, (err: any) => {
        console.error('Failed to fetch vendor data:', err);
      });
    } else {
      console.warn('Vendor ID not found in token.');
    }
  }

  logout(): void {
    sessionStorage.clear();
    window.location.href = '/home';
  }

  editProfile() {
    this.editableUser = {...this.user};
    const offcanvasEl = document.querySelector('.offcanvas.show') as HTMLElement;
    console.log(offcanvasEl);
    if (offcanvasEl) {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
      offcanvasInstance?.hide();
    }
  
    setTimeout(() => {
      const modalEl = document.getElementById('editProfileModal');
      if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        if (modal){
          modal.show();
        }
        console.log(modal);
      }
    }, 0);
  }
}
