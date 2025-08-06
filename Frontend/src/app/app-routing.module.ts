import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { VendorGuard } from './core/guards/vendor.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
  path: 'home',
  loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule)
},
{
  path: 'vendor',
  canActivate: [VendorGuard],
  canLoad: [VendorGuard],
  loadChildren: () => import('./modules/vendor/vendor.module').then(m => m.VendorModule)
},
  { 
    path: 'admin', 
    canActivate: [AdminGuard], 
    canLoad: [AdminGuard], 
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) 
  },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'layout', loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
