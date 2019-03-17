import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, timer, of } from 'rxjs';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.Service';
import { switchMap, map } from 'rxjs/operators';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {


  subscription: Subscription;
  submited: boolean;
  myForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.maxLength(30), Validators.email], [this.validateCodeUnique.bind(this)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rePassword: ['', [Validators.required, Validators.minLength(6), this.checkPassMatch.bind(this)]]

  });

  constructor(
              private router: Router,
              private authService: AuthService,
              private fb: FormBuilder,
              private registerService: RegisterService) { }

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn.subscribe(isLogin => {
        if (isLogin) {
          this.router.navigate(['/']);
        }
    });
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  validateCodeUnique(control: FormControl) {
    return timer(800).pipe(
      switchMap(() => {
        if (!control.value) {
          return of(null);
        }
        return this.registerService.checkEmailIsInUse( control.value.trim())
        .pipe(map((res) => {
             if (res.data) {
               return {'emailDuplicate' : true};
             }
             return null;
        }));
      })
    );
  }
}
