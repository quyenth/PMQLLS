import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from '../shared/services/base.service';
import { FilterCondition } from '../shared/models/filter-condition';
import { HttpResult } from '../shared/commons/http-result';
import { CapBac } from '../shared/models/cap-bac.model';
import { Select2Model } from '../shared/models/select2.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CapbacService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/CapBac/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: CapBac) {
    const url = this.BaseUrl + '/api/capbac/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: CapBac): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/capbac/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: CapBac[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/capbac/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: CapBac[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/capbac/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: number): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Capbac/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }

  checkNameIsUnique (capBacId: number, name: string)  {
    const params = new HttpParams().set('capBacId', capBacId.toString()).set('name', name);
    const url = this.BaseUrl + '/api/capbac/checkNameIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }

  getListAllCapBac(): Observable<Select2Model[]> {
    const url = this.BaseUrl + '/api/capbac/GetListAllCapBac';
    return this.http.get<HttpResult>(url).pipe(map(res => {
        const result: Select2Model[] = [] ;
        res.data.forEach(element => {
          result.push(new Select2Model (element.capBacId, element.text));
        });
        return result ;
    }));
  }
}
