import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { DoiTuongModel } from './doituong.model';

@Injectable({
  providedIn: 'root'
})
export class DoiTuongService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/DoiTuong/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: DoiTuongModel) {
    const url = this.BaseUrl + '/api/doiTuong/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: DoiTuongModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/doiTuong/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: DoiTuongModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/doiTuong/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: DoiTuongModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/doiTuong/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/doiTuong/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }

  checkNameIsUnique (id: number, name: string)  {
    const params = new HttpParams().set('id', id.toString()).set('name', name);
    const url = this.BaseUrl + '/api/doiTuong/CheckNameIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }
}
