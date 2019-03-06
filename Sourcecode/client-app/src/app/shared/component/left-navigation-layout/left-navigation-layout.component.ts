import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.Service';

@Component({
  selector: 'app-left-navigation-layout',
  templateUrl: './left-navigation-layout.component.html',
  styleUrls: ['./left-navigation-layout.component.css']
})
export class LeftNavigationLayoutComponent implements OnInit {

  isAdmin: boolean;
  currentUser: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAdmin.subscribe(data => {
        this.isAdmin = data;
    });
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    })
  }

}
