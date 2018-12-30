import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { HuyenModel } from './huyen.model';

@Injectable({
  providedIn: 'root'
})
export class HuyenService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Huyen/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: HuyenModel) {
    const url = this.BaseUrl + '/api/huyen/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: HuyenModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/huyen/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: HuyenModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/huyen/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: HuyenModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/huyen/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/huyen/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }

  checkCodeIsUnique (huyenId: number, maHuyen: string)  {
    const params = new HttpParams().set('huyenId', huyenId.toString()).set('maHuyen', maHuyen);
    const url = this.BaseUrl + '/api/huyen/CheckCodeIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }
  checkNameIsUnique (huyenId: number, tenHuyen: string)  {
    const params = new HttpParams().set('huyenId', huyenId.toString()).set('tenHuyen', tenHuyen);
    const url = this.BaseUrl + '/api/huyen/CheckNameIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }
}
