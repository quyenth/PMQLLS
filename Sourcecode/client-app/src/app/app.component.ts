import { AuthService } from './shared/services/auth.Service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  isLoggedIn$: Observable<boolean>;
 constructor(
    private authService: AuthService
   ) {

 }
  ngOnInit() {
    // this.autService.login('quyenth@gmail.com', 'Admin@123');
    // this.autService.getValues();
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  logout(){
    this.authService.logout();
  }
}
