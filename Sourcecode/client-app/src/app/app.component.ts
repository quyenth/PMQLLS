import { AuthService } from './shared/services/auth.Service';
import { OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  isLoggedIn: boolean;
  isAdmin: boolean;
  subscription: Subscription;

  modelDate = '';

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };     
    container.setViewMode('month');
  }

 constructor(
    private authService: AuthService
   ) {

 }
  ngOnInit() {
   this.subscription =  this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      if ( data ) {
        this.authService.getCurentUserInfo().subscribe( res => {
           if (res.data && res.data.roles != null && res.data.roles.length > 0)  {
              const roles = res.data.roles;
              if ( roles.indexOf('Admin') > -1) {
                  this.authService.isAdmin.next(true);
                  this.authService.currentUser.next(res.data.email);
              } else {
                this.authService.isAdmin.next(false);
                this.authService.currentUser.next(res.data.email);
              }
           } else {
              this.authService.isAdmin.next(false);
              this.authService.currentUser.next(res.data.email);
           }
        });
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
