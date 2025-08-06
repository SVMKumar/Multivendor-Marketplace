import { Component } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  shopCategories = [
    { name: 'Electronics', link: '/' },
    { name: 'Fashion', link: '/' },
    { name: 'Home & Furniture', link: '/' },
    { name: 'Beauty & Personal Care', link: '/' },
    { name: 'Sports & Outdoors', link: '/' },
    { name: 'Toys & Games', link: '/' }
  ];
  
  customerService = [
    { name: 'Contact Us', link: '/' },
    { name: 'FAQs', link: '/' },
    { name: 'Returns & Refunds', link: '/' },
    { name: 'Shipping Policy', link: '/' },
    { name: 'Terms & Conditions', link: '/' },
    { name: 'Privacy Policy', link: '/' }
  ];
  
  aboutUs = [
    { name: 'About ShopHub', link: '/' },
    { name: 'Careers', link: '/' },
    { name: 'Blog', link: '/' },
    { name: 'Press Releases', link: '/' },
    { name: 'Corporate Responsibility', link: '/' }
  ];
  
  sellerInfo = [
    { name: 'Become a Seller', link: '/' },
    { name: 'Seller Center', link: '/' },
    { name: 'Seller Guidelines', link: '/' },
    { name: 'Success Stories', link: '/' }
  ];
  
  paymentMethods = [
    { name: 'Credit/Debit Cards', icon: 'credit_card' },
    { name: 'PayPal', icon: 'account_balance_wallet' },
    { name: 'Bank Transfer', icon: 'account_balance' },
    { name: 'Cash on Delivery', icon: 'local_shipping' }
  ];
  
  socialMedia = [
    { name: 'Facebook', icon: 'facebook', link: '/' },
    { name: 'linkdin', icon: 'linkdin', link: '/' },
    { name: 'Instagram', icon: 'photo_camera', link: '/' },
    { name: 'YouTube', icon: 'smart_display', link: '/' }
  ];
}