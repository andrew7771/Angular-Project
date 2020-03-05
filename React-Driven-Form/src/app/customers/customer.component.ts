import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean} | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return {'range' : true};
    }
    return null;
  }
};


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required]],
      phone:'',
      notification: 'email',
      rating: [null, ratingRange(1,5)],
      sendCatalog: {value: true, disabled: false}
    });   
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm));
  }

  populateTestData() {
    // this.customerForm.setValue({
    //   firstName: 'Lack',
    //   lastName: 'Doe',
    //   email: 'testmail@gmail.com',
    //   sendCatalog: false
    // });
    this.customerForm.patchValue({
      firstName: 'Lack',
      lastName: 'Doe',
      sendCatalog: false
    });
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }


}
