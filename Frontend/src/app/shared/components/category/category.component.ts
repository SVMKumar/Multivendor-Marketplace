import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  topCategories: { category: string; imageUrl: string }[] = [];
 constructor (private ps: ProductService) { };
 ngOnInit(): void {
  this.ps.getCategories().subscribe((data: any) => {
    this.topCategories = data;
  }, (err: any) => {
    console.log(err);
  });
 }
}
