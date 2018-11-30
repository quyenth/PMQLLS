import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { LoaiDoiTuongModel } from './loaidoituong.model';

@Injectable({
  providedIn: 'root'
})
export class LoaiDoiTuongService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/LoaiDoiTuong/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: LoaiDoiTuongModel) {
    const url = this.BaseUrl + '/api/loaiDoiTuong/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: LoaiDoiTuongModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/loaiDoiTuong/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: LoaiDoiTuongModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/loaiDoiTuong/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: LoaiDoiTuongModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/loaiDoiTuong/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/loaiDoiTuong/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }
}
