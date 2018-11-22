import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { HttpResult } from '../shared/commons/http-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

   }

  /**
   * Dang nhap
   * @param userinfo thong tin dang nhap
   */
  login(userName: string, password: string): Observable<HttpResult> {
    let url = this.BaseUrl + "/Account/Signin" ;
    return this.http.post<HttpResult>(url, { username: userName, password: password });
  }

  logout() {

  }
}
