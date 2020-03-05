import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NumberValidators } from '../shared/number.validator';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  pageTitle = 'Product Edit';
  
  productForm: FormGroup;
  sub: Subscription;
  product: Product;
  errorMessage: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private productService: ProductService ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required,
                        Validators.minLength(3),
                      Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1,5)],
      tags: this.fb.array([]),
      description:''
    });

    this.sub = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getProduct(id);
      }
    )

  }

  getProduct(id: number): void {
    this.productService.getProductById(id)
      .subscribe({
        next: (product: Product) => this.displayProduct(product),
        error: err => this.errorMessage = err
      });
  }

  displayProduct(product: Product): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.productId === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }


}
