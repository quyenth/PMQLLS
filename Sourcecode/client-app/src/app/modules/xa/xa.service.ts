import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { XaModel } from './xa.model';
import { Select2Model } from 'src/app/shared/models/select2.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class XaService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Xa/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: XaModel) {
    const url = this.BaseUrl + '/api/xa/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: XaModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/xa/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: XaModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/xa/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: XaModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/xa/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/xa/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }

  checkCodeIsUnique (xaId: number, maXa: string)  {
    const params = new HttpParams().set('xaId', xaId.toString()).set('maXa', maXa);
    const url = this.BaseUrl + '/api/xa/CheckCodeIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }
  checkNameIsUnique (xaId: number, tenXa: string)  {
    const params = new HttpParams().set('xaId', xaId.toString()).set('tenHuyen', tenXa);
    const url = this.BaseUrl + '/api/xa/CheckNameIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }

}
