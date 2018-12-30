import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { TinhModel } from './tinh.model';
import { Select2Model } from 'src/app/shared/models/select2.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TinhService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Tinh/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: TinhModel) {
    const url = this.BaseUrl + '/api/tinh/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: TinhModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/tinh/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: TinhModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/tinh/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: TinhModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/tinh/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/tinh/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }
  checkCodeIsUnique (tinhId: number, maTinh: string)  {
    const params = new HttpParams().set('tinhId', tinhId.toString()).set('maTinh', maTinh);
    const url = this.BaseUrl + '/api/tinh/CheckCodeIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }
  checkNameIsUnique (tinhId: number, tenTinh: string)  {
    const params = new HttpParams().set('tinhId', tinhId.toString()).set('tenTinh', tenTinh);
    const url = this.BaseUrl + '/api/tinh/CheckNameIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }

  getListAllTinh(): Observable<Select2Model[]> {
    const url = this.BaseUrl + '/api/tinh/getListAllTinh';
    return this.http.get<HttpResult>(url).pipe(map(res => {
        const result: Select2Model[] = [] ;
        res.data.forEach(element => {
          result.push(new Select2Model (element.tinhId, element.tenTinh));
        });
        return result ;
    }));

  }
}
