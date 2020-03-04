import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';
import { FormGroup, FormBuilder } from '@angular/forms';

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
      firstName: '',
      lastName: '',
      email: '',
      sendCatalog: {value: true, disabled: true}
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
}
