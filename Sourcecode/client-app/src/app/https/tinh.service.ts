import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders  } from '@angular/common/http';

import { BaseService } from '../shared/services/base.service';
import { FilterCondition } from '../shared/models/filter-condition';
import { HttpResult } from '../shared/commons/http-result';
import { Tinh } from '../shared/models/tinh.model';

@Injectable({
  providedIn: 'root'
})
export class TinhService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/tinh/search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: Tinh) {
    const url = this.BaseUrl + '/api/tinh';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(id: number): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/tinh/save' + id;
    return this.http.delete<HttpResult>(url);
  }

  saveList(list: Tinh[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/tinh/saveList';
    return this.http.post<HttpResult>(url, list);
  }
}
