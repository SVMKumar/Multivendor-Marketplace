
import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/core/services/vendor.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit{

  paymentMethodForm: FormGroup;
  token:any;
  paymentMethods:any= [];
  vendorId:any;
  constructor(private vs:VendorService,private fb: FormBuilder){
    this.paymentMethodForm= this.fb.group({
      paymentType: ['', Validators.required],
      recipientHandle: ['', Validators.required]
    })
  };


  ngOnInit(): void {
   
    this.token = sessionStorage.getItem('token');
    const payloadBase64 = this.token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const decodedToken = JSON.parse(decodedPayload);
    this.vendorId = decodedToken.vendorId;
    this.getPaymentMethods();
  }

  getPaymentMethods(){
    this.vs.getPaymentMethods(this.vendorId).subscribe((data)=>{
      this.paymentMethods=data.paymentMethods;
    },(err)=>{
      console.log("Error occured");
    })
  }

  onSubmit(){
       let paymentObj={
        paymentType:this.paymentMethodForm.value.paymentType,
        recipientHandle:this.paymentMethodForm.value.recipientHandle
      }
      this.vs.addPaymentMethods(this.vendorId,paymentObj).subscribe((data)=>{
        console.log(data);
      },(err)=>{
        console.log(err);
      });
      this.paymentMethods.push(paymentObj)
    }

    deletePaymentMethod(paymentMethod:any){
      this.vs.deletePaymentMethods(this.vendorId,paymentMethod).subscribe((data)=>{
        console.log(data);
        this.paymentMethods= this.paymentMethods.filter((pm:any)=>{
        return !(pm.paymentType===paymentMethod.paymentType && pm.recipientHandle=== paymentMethod.recipientHandle)  }
        )
      },(err)=>{
        console.log(err);
      })
    }
}



