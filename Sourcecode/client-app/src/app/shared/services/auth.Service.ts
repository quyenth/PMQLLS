
import { BaseService } from './base.service';
import { OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';


@Injectable()
export class AuthService extends BaseService implements OnInit {
  constructor(private http: HttpClient) {
    super();
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
      }, {
          params: {
            username: username,
            password: password
          }
        }

      ).pipe(user => {
        console.log(user);
        return user;
      }).subscribe(b => {
        localStorage.setItem('currentUser', JSON.stringify({
          token: b
        }));
        console.log(b);
      });
  }

  logout() {
    // delete token from local storage

  }

  getValues() {
    this.http.get(this.BaseUrl + '/api/values').subscribe(result => console.log(result));
  }
  ngOnInit() {
    console.log(this.BaseUrl);
  }
}
