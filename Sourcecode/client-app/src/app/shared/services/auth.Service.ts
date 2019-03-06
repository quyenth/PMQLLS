
import { BaseService } from './base.service';
import { OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval, pipe, BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpResult } from '../commons/http-result';


@Injectable()
export class AuthService extends BaseService implements OnInit {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedInFalse: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient, private router: Router , private toastr: ToastrService) {
    super();
    let currentUser = null
    if ( localStorage.getItem('currentUser')) {
      currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    if (currentUser !== '' && currentUser !== undefined && currentUser !== null && currentUser.token !== '') {
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
        if (result.data) {
          localStorage.setItem('currentUser', JSON.stringify({
            token: result.data
          }));
          this.loggedIn.next(true);
          this.router.navigate(['']);
        } else {
          this.loggedInFalse.next(true);
        }
      });
  }

  logout() {
    // delete token from local storage
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);

  }

  register ( username: string, password: string , fullName: string) {
      this.http.post(this.BaseUrl + '/api/auth/register', {
        userName: username,
        email: username,
        passWord: password,
        fullName: fullName
      }).subscribe((res) => {
        this.toastr.success('Tạo mới tài khoản thành công');
        this.router.navigate(['/login']);
      }, (err) => {
        this.toastr.error('Error');
         console.log(err);
      });

  }

  getCurentUserInfo() : Observable<HttpResult> {
    return this.http.get<HttpResult>(this.BaseUrl + '/api/Account/GetCurentUserInfo');
  }

  ngOnInit() {
    console.log(this.BaseUrl);
  }
}
