import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { User_testModel } from './user_test.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Account/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: User_testModel) {
    const url = this.BaseUrl + '/api/user_test/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: User_testModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Account/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: User_testModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/user_test/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: User_testModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/user_test/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/user_test/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }
}
