import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { Router } from '@angular/router';
import { FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  productForm: FormGroup;
  vendorId: any;

  constructor(private fb: FormBuilder, private ps: ProductService, private router: Router, private ac: ActivatedRoute) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['',Validators.maxLength(200)],
      category:[''],
      variants: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.vendorId = this.ac.snapshot.paramMap.get('vendorId');
    console.log(this.vendorId);
  }

  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  createVariant(): FormGroup {
    return this.fb.group({
      color: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      size: ['', Validators.required],
    });
  }

  addVariant(): void {
    this.variants.push(this.createVariant());
  }

  removeVariant(index: number): void {
    this.variants.removeAt(index);
  }

  uploadedImageUrl: string | null = null;
selectedFile: File | null = null; 

onFileSelected(event: Event): void {
  const fileInput = event.target as HTMLInputElement;

  if (fileInput.files && fileInput.files.length > 0) {
    this.selectedFile = fileInput.files[0];

    this.ps.getImageUrl(this.selectedFile).subscribe((data: any) => {
      this.uploadedImageUrl = data.imageUrl;
    }, (err: any) => {
      console.log(err);
    });
  }
}

  onSubmit(): void {
    if (this.productForm.valid) {
      const productObj = { ...this.productForm.value, 'imageUrl': this.uploadedImageUrl};
      console.log(productObj);
      this.ps.listProduct(this.vendorId,productObj).subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/vendor']);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}