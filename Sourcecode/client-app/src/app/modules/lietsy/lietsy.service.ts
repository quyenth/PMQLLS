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

  save(model) {
    if(model.ngayXuatNgu){
      model.ngayXuatNgu = this.fixDateFomat(model.ngayXuatNgu);
    }
    if(model.ngayNhapNgu){
      model.ngayNhapNgu = this.fixDateFomat(model.ngayNhapNgu);
    }
    if(model.ngayVaoDoan){
      model.ngayVaoDoan = this.fixDateFomat(model.ngayVaoDoan);
    }
    if(model.ngayVaoDang){
      model.ngayVaoDang = this.fixDateFomat(model.ngayVaoDang);
    }
    if(model.ngayHiSinh){
      model.ngayHiSinh = this.fixDateFomat(model.ngayHiSinh);
    }
    if(model.ngayTaiNgu){
      model.ngayTaiNgu = this.fixDateFomat(model.ngayTaiNgu);
    }
    const url = this.BaseUrl + '/api/lietSy/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

   fixDateFomat (date: Date){
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()));
    let result = JSON.stringify(utcDate);
    if(result){
      result = result.substring(0, result.length - 1);
      result = result.substr(1);
    }
    return result;
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

  exportExcel (filterCondition): Observable<any> {
    const url = this.BaseUrl + '/api/lietSy/ExportListLietSi';
    return this.http.post(url, filterCondition , { responseType: 'blob' } );

  }
}
