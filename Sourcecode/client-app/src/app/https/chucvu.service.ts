import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from '../shared/services/base.service';
import { FilterCondition } from '../shared/models/filter-condition';
import { HttpResult } from '../shared/commons/http-result';
import { ChucVuModel } from '../shared/models/chucVu.model';

@Injectable({
  providedIn: 'root'
})
export class ChucVuService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/ChucVu/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: ChucVuModel) {
    const url = this.BaseUrl + '/api/chucVu/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: ChucVuModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/chucVu/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: ChucVuModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/chucVu/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: ChucVuModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/chucVu/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/chucVu/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }
}
