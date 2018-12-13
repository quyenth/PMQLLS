import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { SoQuyenModel } from './soquyen.model';

@Injectable({
  providedIn: 'root'
})
export class SoQuyenService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/SoQuyen/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: SoQuyenModel) {
    const url = this.BaseUrl + '/api/soQuyen/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: SoQuyenModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/soQuyen/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: SoQuyenModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/soQuyen/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: SoQuyenModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/soQuyen/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/soQuyen/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }
}
