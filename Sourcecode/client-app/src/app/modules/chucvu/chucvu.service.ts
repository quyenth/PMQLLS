import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { ChucVuModel } from './chucvu.model';
import { Select2Model } from 'src/app/shared/models/select2.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChucVuService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/ChucVu/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: ChucVuModel) {
    const url = this.BaseUrl + '/api/chucVu/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: ChucVuModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/chucVu/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: ChucVuModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/chucVu/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: ChucVuModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/chucVu/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/chucVu/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }

  checkNameIsUnique (id: number, name: string)  {
    const params = new HttpParams().set('id', id.toString()).set('name', name);
    const url = this.BaseUrl + '/api/chucVu/CheckNameIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }

  checkCodeIsUnique (id: number, code: string)  {
    const params = new HttpParams().set('id', id.toString()).set('code', code);
    const url = this.BaseUrl + '/api/chucVu/checkCodeIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }

  getListAllChucVu(): Observable<Select2Model[]> {
    const url = this.BaseUrl + '/api/chucVu/getListAllChucVu';
    return this.http.get<HttpResult>(url).pipe(map(res => {
        const result: Select2Model[] = [] ;
        res.data.forEach(element => {
          result.push(new Select2Model (element.chucVuId, element.name));
        });
        return result ;
    }));
  }
}
