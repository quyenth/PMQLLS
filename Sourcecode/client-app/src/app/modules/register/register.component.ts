import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.Service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  subscription: Subscription;
  submited: boolean;
  myForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rePassword: ['', [Validators.required, Validators.minLength(6), this.checkPassMatch.bind(this)]]

  });

  constructor( private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submited = true;
    if ( !this.myForm.valid) {
      return;
    }

    this.authService.register(this.myForm.get('email').value , this.myForm.get('password').value , this.myForm.get('fullName').value);
  }

  checkPassMatch (control: FormControl) {
     if ( control.value && this.myForm.get('password').value && control.value !== this.myForm.get('password').value) {
          return {'passNotMatch' : true};
     }

     return null;
  }
}
