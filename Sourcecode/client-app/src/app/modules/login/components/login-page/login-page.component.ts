import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.Service';
import { ActionType } from 'src/app/shared/commons/action-type';

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
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
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
    this.subscription.unsubscribe();
  }

  onformChange (){
      this.authService.loggedInFalse.next(false);
  }

}
