import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-vendor-register',
  templateUrl: './vendor-register.component.html',
  styleUrls: ['./vendor-register.component.css']
})
export class VendorRegisterComponent {
  vendorRegistrationForm: FormGroup;
  successMessage: String = '';
  errorMessage: String = '';

  constructor(private fb: FormBuilder, private as: AuthService) {
    this.vendorRegistrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]{3,}$/)]],
      storeName: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]{3,}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]{1}[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9]{1,}@[a-z]{2,}.com$/)]],
      dob: ['', [Validators.required, this.validateDate]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', this.validatePassword]
    },
    {validator: this.validatePassword}
  )
  }
  validateDate(c: FormControl) {
    const inputDate = new Date(c.value);
    const today = new Date();
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (inputDate >= today) {
      return { dateInvalid: true };
    }
    else
      return null;
  }
  validatePassword: Function = (vendorRegistrationForm: FormGroup) => {
    const password = vendorRegistrationForm.get('password')?.value;
    const confirmPassword = vendorRegistrationForm.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  onSubmit() {
    this.as.registerVendor(this.vendorRegistrationForm.value).subscribe((data: any) => {
      this.successMessage = data.message;
      this.errorMessage = '';
    }, (err: any) => {
      this.successMessage = '';
      console.log(err);
      this.errorMessage = err.error.message
    })
  }
}
