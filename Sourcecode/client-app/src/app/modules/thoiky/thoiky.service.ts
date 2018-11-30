import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { ThoiKyModel } from './thoiky.model';

@Injectable({
  providedIn: 'root'
})
export class ThoiKyService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/ThoiKy/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: ThoiKyModel) {
    const url = this.BaseUrl + '/api/thoiKy/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: ThoiKyModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/thoiKy/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: ThoiKyModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/thoiKy/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: ThoiKyModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/thoiKy/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/thoiKy/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }

  checkNameIsUnique (id: number, name: string)  {
    const params = new HttpParams().set('id', id.toString()).set('name', name);
    const url = this.BaseUrl + '/api/thoiky/checkNameIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }
}
