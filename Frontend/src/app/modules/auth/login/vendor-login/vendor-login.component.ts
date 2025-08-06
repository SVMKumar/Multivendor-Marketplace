import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.css']
})
export class VendorLoginComponent {
  vendorLoginForm: FormGroup;
  errorMessage: String = '';
  
  
  constructor(private fb: FormBuilder, private as: AuthService, private router: Router){
    this.vendorLoginForm= this.fb.group({
      identifier:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  onSubmit(){
    this.as.vendorLogin(this.vendorLoginForm.value).subscribe((data: any) => {
      sessionStorage.setItem('token', data.token);
      if (data.status === 'Active') {
        this.router.navigate(['/vendor']);
      }
      else {
        this.errorMessage = 'Please wait for admin approval!!';
        this.vendorLoginForm.reset();
      }
    }, (err: any) => {
      this.vendorLoginForm.reset();
      this.errorMessage = err.error.message;
    });
  }
}
