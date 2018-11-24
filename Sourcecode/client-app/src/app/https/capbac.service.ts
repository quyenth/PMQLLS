import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { BaseService } from '../shared/services/base.service';
import { FilterCondition } from '../shared/models/filter-condition';
import { HttpResult } from '../shared/commons/http-result';
import { CapBac } from '../shared/models/cap-bac.model';

@Injectable({
  providedIn: 'root'
})
export class CapbacService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/capbac/search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: CapBac): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/capbac/save';
    return this.http.post<HttpResult>(url, model);
  }

  delete(id: number): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/capbac/save' + id;
    return this.http.delete<HttpResult>(url);
  }

  saveList(list: CapBac[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/capbac/saveList';
    return this.http.post<HttpResult>(url, list);
  }
}
