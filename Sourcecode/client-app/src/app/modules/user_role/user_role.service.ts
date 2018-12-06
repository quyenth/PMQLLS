import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { UserRolesModel } from './user_role.model';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/AspNetUserRoles/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: UserRolesModel) {
    const url = this.BaseUrl + '/api/aspNetUserRoles/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: UserRolesModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/aspNetUserRoles/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: UserRolesModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/aspNetUserRoles/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: UserRolesModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/aspNetUserRoles/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/aspNetUserRoles/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }
}
