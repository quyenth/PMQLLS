import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.Service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {


  subscription: Subscription;
  submited: boolean;
  loggedInFalse: boolean;

  myForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
      private authService: AuthService,
      private fb: FormBuilder,
      ) {}

  ngOnInit() {

  }

  onSubmit() {
      this.submited = true;
      this.authService.login(this.myForm.controls.username.value, this.myForm.controls.password.value);
      this.subscription = this.authService.loggedInFalse.subscribe(data => {
        this.loggedInFalse = data;
      });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onformChange (){
      this.authService.loggedInFalse.next(false);
  }

}
