import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { Ncc_PhieuCungCapModel } from './ncc_phieucungcap.model';

@Injectable({
  providedIn: 'root'
})
export class Ncc_PhieuCungCapService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Ncc_PhieuCungCap/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: Ncc_PhieuCungCapModel) {
    const url = this.BaseUrl + '/api/ncc_PhieuCungCap/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: Ncc_PhieuCungCapModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/ncc_PhieuCungCap/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: Ncc_PhieuCungCapModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/ncc_PhieuCungCap/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: Ncc_PhieuCungCapModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/ncc_PhieuCungCap/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/ncc_PhieuCungCap/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }
}
