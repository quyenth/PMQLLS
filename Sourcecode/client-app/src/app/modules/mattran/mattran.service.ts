import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { MatTranModel } from './mattran.model';

@Injectable({
  providedIn: 'root'
})
export class MatTranService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/MatTran/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: MatTranModel) {
    const url = this.BaseUrl + '/api/matTran/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: MatTranModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/matTran/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: MatTranModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/matTran/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: MatTranModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/matTran/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/matTran/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }

  checkNameIsUnique (id: number, ma: string)  {
    const params = new HttpParams().set('id', id.toString()).set('ma', ma);
    const url = this.BaseUrl + '/api/matTran/CheckCodeIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }
}
