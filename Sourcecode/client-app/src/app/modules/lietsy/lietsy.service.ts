import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { LietSyModel } from './lietsy.model';

@Injectable({
  providedIn: 'root'
})
export class LietSyService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/LietSy/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: LietSyModel) {
    const url = this.BaseUrl + '/api/lietSy/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: LietSyModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/lietSy/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: LietSyModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/lietSy/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: LietSyModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/lietSy/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/lietSy/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }
}
