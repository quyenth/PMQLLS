import { AuthService } from './shared/services/auth.Service';
import { OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  isLoggedIn: boolean;
  subscription: Subscription;

 constructor(
    private authService: AuthService
   ) {

 }
  ngOnInit() {
   this.subscription =  this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
