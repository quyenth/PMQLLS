import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { HttpResult } from 'src/app/shared/commons/http-result';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService {
  constructor(private http: HttpClient ) {
    super();
  }
  checkEmailIsInUse(email: string) {
    const params = new HttpParams().set('email', email);
    const url = this.BaseUrl + '/api/Account/CheckEmailIsInUse';
    return this.http.get<HttpResult>(url, { params : params});
  }
}
