import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { NghiaTrangModel } from './nghiatrang.model';

@Injectable({
  providedIn: 'root'
})
export class NghiaTrangService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/NghiaTrang/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: NghiaTrangModel) {
    const url = this.BaseUrl + '/api/nghiaTrang/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: NghiaTrangModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/nghiaTrang/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: NghiaTrangModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/nghiaTrang/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: NghiaTrangModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/nghiaTrang/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/nghiaTrang/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }
}
