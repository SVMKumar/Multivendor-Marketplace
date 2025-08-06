import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomerGuard } from 'src/app/core/guards/customer.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cart', component: CartComponent, canActivate: [CustomerGuard] },
    { path: 'products', component: ProductListComponent, canActivate: [CustomerGuard] },
    { path: 'products/vendor/:vendorId', component: ProductListComponent, canActivate: [CustomerGuard] },
    { path: 'products/:category', component: ProductListComponent, canActivate: [CustomerGuard] },
    { path: 'products/search/:identifier', component: ProductListComponent, canActivate: [CustomerGuard] },
    { path: 'productdetails/:id', component: ProductDetailComponent, canActivate: [CustomerGuard] },
    { path: 'checkout', component: CheckoutComponent, canActivate: [CustomerGuard] },
    { path: 'orders', component: OrdersComponent, canActivate: [CustomerGuard] }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
