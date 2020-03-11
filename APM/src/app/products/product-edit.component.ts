import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, FormControlName } from '@angular/forms';
import { Subscription, Observable, merge, fromEvent } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NumberValidators } from '../shared/number.validator';
import { Product } from './product';
import { ProductService } from './product.service';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy, AfterViewInit {
  pageTitle = 'Product Edit';
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  productForm: FormGroup;
  sub: Subscription;
  product: Product;
  errorMessage: string;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  genericValidator: GenericValidator;

  
  constructor(private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService ) {
      // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
     }

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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.productForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.productForm);
    });
  }

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  getProduct(id: number): void {
    this.productService.getProduct(id)
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

    if (this.product.id === 0) {
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

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const p = { ...this.product, ...this.productForm.value };

        if (p.id === 0) {
          this.productService.createProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.productService.updateProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
}
