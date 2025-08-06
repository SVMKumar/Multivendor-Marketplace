import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent {
  custLoginForm: FormGroup;
  errorMessage: String = '';
  
  constructor(private fb: FormBuilder, private as: AuthService, private router: Router){
    this.custLoginForm= this.fb.group({
      identifier:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  onSubmit(){
    this.as.customerLogin(this.custLoginForm.value).subscribe((data: any) => {
      sessionStorage.setItem('token', data.token);
      this.router.navigate(['customer']);
    }, (err: any) => {
      this.errorMessage = err.error.message;
      this.custLoginForm.reset();
    });
  }
}
