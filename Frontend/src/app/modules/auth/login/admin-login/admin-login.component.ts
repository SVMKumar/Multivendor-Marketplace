import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  adminLoginForm: FormGroup;
  errorMessage: String = '';

  constructor(private fb: FormBuilder, private as: AuthService, private router: Router) {
    this.adminLoginForm = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  onSubmit() {
    this.as.adminLogin(this.adminLoginForm.value).subscribe((data: any) => {
      sessionStorage.setItem('token', data.token);
      this.router.navigate(['admin/dashboard']);
    }, (err: any) => {
      this.adminLoginForm.reset();
      this.errorMessage = err.error.message;
    })
  }
}
