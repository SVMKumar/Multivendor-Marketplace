import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators,FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent {
  custRegistrationForm: FormGroup;
  successMessage: String = '';
  errorMessage: String = '';

  constructor(private fb: FormBuilder, private as: AuthService, private router: Router){
    this.custRegistrationForm= this.fb.group({
      name:['',[Validators.required,Validators.pattern(/^[A-Za-z ]{3,}$/)]],
      phone:['',[Validators.required,Validators.pattern(/^[6-9]{1}[0-9]{9}$/)]],
      email:['',[Validators.required,Validators.pattern(/^[a-z0-9]{1,}@[a-z]{2,}.com$/)]],
      dob:['',[Validators.required,this.validateDate]],
      address:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',this.validatePassword]
    },
    {validator: this.validatePassword}
  )
  }

  validateDate(c: FormControl){
    const inputDate= new Date(c.value);
    const today=new Date();
    inputDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    if(inputDate>=today){
      return {dateInvalid:true };
    }
    else
    return null;
  }

  validatePassword: Function = (custRegistrationForm: FormGroup) => {
    const password = custRegistrationForm.get('password')?.value;
    const confirmPassword = custRegistrationForm.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(){
    this.as.registerCustomer(this.custRegistrationForm.value).subscribe((data: any) => {
      this.successMessage = data.message;
      this.errorMessage = '';
      setTimeout(() => {
        this.router.navigate(['/auth/login/customer']);
      }, 2000);
    }, (err: any) => {
      this.successMessage = '';
      this.errorMessage = err.error.message;
    });
  }
}
