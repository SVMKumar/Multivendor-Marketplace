import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LayoutsModule } from '../layouts/layouts.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryComponent } from './components/category/category.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';





@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CategoryComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    CategoryComponent,
    EditProfileComponent
  ]
})
export class SharedModule { }
