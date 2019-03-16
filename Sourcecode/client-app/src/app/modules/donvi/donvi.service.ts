import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { DonViModel } from './donvi.model';
import { Select2Model } from 'src/app/shared/models/select2.model';
import { map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class DonViService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(filterCondition: FilterCondition): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/DonVi/Search';
    return this.http.post<HttpResult>(url, filterCondition);
  }

  save(model: DonViModel) {
    const url = this.BaseUrl + '/api/donVi/save';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: DonViModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/donVi/Delete';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: DonViModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/donVi/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: DonViModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/donVi/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/donVi/GetById/' + id;
    return this.http.get<HttpResult>(url);
  }

  checkCodeIsUnique (donViId: number, maDonVi: string)  {
    const params = new HttpParams().set('donViId', donViId.toString()).set('maDonVi', maDonVi);
    const url = this.BaseUrl + '/api/donVi/CheckCodeIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }
  checkNameIsUnique (donViId: number, tenDonVi: string)  {
    const params = new HttpParams().set('donViId', donViId.toString()).set('tenDonVi', tenDonVi);
    const url = this.BaseUrl + '/api/donVi/CheckNameIsUnique';
    return this.http.get<HttpResult>(url, { params : params});
  }
  getListAllDonVi(): Observable<Select2Model[]> {
    const url = this.BaseUrl + '/api/DonVi/getListAllDonVi';
    return this.http.get<HttpResult>(url).pipe(map(res => {
        const result: Select2Model[] = [] ;
        let tree;
        tree = this.buildTree(res.data, 'maDonVi', 'maDonViCha', null , tree);
        tree.forEach(element => {
          const donviSelect2Model = new Select2Model (element.donViId, element.tenDonVi);
          donviSelect2Model.children = element.children;
          result.push(donviSelect2Model);
        });
        return result ;
    }));
  }

  buildTree(array: [], keyId, parentKeyId, parent, tree) {
    let selft = this;
    tree = typeof tree !== 'undefined' ? tree : [];
    if ( parent === null) {
        parent = {};
        parent[keyId] = null;
    }


    let children =  array.filter(child => child[parentKeyId] === parent[keyId]) ;

    if (children != null && children.length > 0) {
        if (parent[keyId] == null) {
            tree = children;
        } else {
            parent['children'] = children;
        }
        for(let child of children){
          selft.buildTree(array, keyId, parentKeyId, child , tree)
        }
    }

    return tree;
  }
}
