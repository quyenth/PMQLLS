import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { RoleModel } from './role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Role/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: RoleModel) {
    const url = this.BaseUrl + '/api/Role/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: RoleModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Role/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: RoleModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Role/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: RoleModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Role/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Role/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }
}
