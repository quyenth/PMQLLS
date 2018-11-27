import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.Service';

@Component({
  selector: 'app-header-right',
  templateUrl: './header-right.component.html',
  styleUrls: ['./header-right.component.css']
})
export class HeaderRightComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }
}
