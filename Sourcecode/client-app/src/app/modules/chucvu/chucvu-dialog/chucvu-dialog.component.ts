import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-chucvu-dialog',
  templateUrl: './chucvu-dialog.component.html',
  styleUrls: ['./chucvu-dialog.component.css']
})
export class ChucvuDialogComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef , private fb: FormBuilder) {}

   submited: boolean;

  myForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    website: ['', Validators.required]
  });

  ngOnInit() {
  }
  onSubmit () {
    console.log(this.myForm);
    this.submited = true;
  }
}
