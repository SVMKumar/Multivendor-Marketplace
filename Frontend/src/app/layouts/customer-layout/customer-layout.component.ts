import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css'],
})


export class CustomerLayoutComponent implements OnInit {

  userId: string | null = null;
  token: any;
  editableUser: any = {};
  user: any = {};

  constructor(private us: UserService, private ar: ActivatedRoute, private route : Router) {}

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    const payloadBase64 = this.token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const decodedToken = JSON.parse(decodedPayload);
    this.userId = decodedToken.customerId;

    if (this.userId) {
      this.us.getUser(this.userId).subscribe({
        next: (data: any) => {
          this.user = data;
        },
        error: (err: any) => {
          console.error('Failed to fetch customer data:', err);
        }
      });
    } else {
      console.warn('User ID is missing from the route. Redirecting or showing fallback UI.');
    }
  }
  logout(): void {
    sessionStorage.clear();
    window.location.href = '/home';
  }
  goToOrders(){
    this.route.navigate(['/home/orders']);
  }

  editProfile() {
    this.editableUser = {...this.user};
    const offcanvasEl = document.querySelector('.offcanvas.show') as HTMLElement;
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

  closeModal() {
    document.body.style.overflow = 'auto';
  }
}
