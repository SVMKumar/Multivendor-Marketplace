import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/core/services/vendor.service';

@Component({
  selector: 'app-vendor-approvals',
  templateUrl: './vendor-approvals.component.html',
  styleUrls: ['./vendor-approvals.component.css']
})
export class VendorApprovalComponent implements OnInit {
  vendors : any[]=[]

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.vendorService.getPendingVendors().subscribe((data) => {
      this.vendors = data;
    }, (err) => {
      console.log(err);
      console.log("Error occured");
    });
  }
  approveVendor: Function = (vendorId: any) => {
    this.vendorService.approveVendor(vendorId, {status: "Active"}).subscribe((data) => {
      this.vendors = this.vendors.filter((vendor: any) => vendor._id !== vendorId);
    }, (err) => {
      console.log(err);
    });
  }

  rejectVendor: Function = (vendorId: any) => {
    this.vendorService.deleteVendor(vendorId).subscribe((data) => {
      this.vendors = this.vendors.filter((vendor: any) => vendor.vendorId !== vendorId);
    }, (err) => {
      console.log(err);
    })
  }
}
