
import { BaseService } from './base.service';
import { OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval, pipe, BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class AuthService extends BaseService implements OnInit {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient,private router: Router) {
    super();
    let currentUser = localStorage.getItem("currentUser");
    if(currentUser!="" && currentUser!= undefined){
      this.loggedIn.next(true);
    }
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  /**
   * return login data
   * @param userName: Input username
   * @param password: Input password
   */
  login(username: string, password: string) {
    console.log('username:', username, ', password:', password);
    return this.http
      .post(this.BaseUrl + '/api/auth/login', {
        userName: username,
        passWord: password
      }

      ).pipe(user => {
        console.log(user);
        return user;
      }).subscribe((result: any) => {
        debugger;
        localStorage.setItem('currentUser', JSON.stringify({
          token: result.data
        }));
        console.log(result);
        this.loggedIn.next(true);
        this.router.navigate(['']);
      });
  }

  logout() {
    // delete token from local storage
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);

  }

  ngOnInit() {
    console.log(this.BaseUrl);
  }
}
