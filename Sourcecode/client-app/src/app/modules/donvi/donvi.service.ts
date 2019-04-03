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
import { DonViSelectModel } from './DonViSelectModel';

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
  getListAllDonVi(): Observable<DonViSelectModel[]> {
    const url = this.BaseUrl + '/api/DonVi/getListAllDonVi';
    return this.http.get<HttpResult>(url).pipe(map(res => {
         const ListDonViMoel : DonViSelectModel[] = [];
         for(const item of res.data) {
              const DonViMoel = new DonViSelectModel();
              DonViMoel.id = item['donViId'];
              DonViMoel.text = item['tenDonVi'];
              DonViMoel.maDonVi = item['maDonVi'];
              DonViMoel.maDonViCha = item['maDonViCha'];
              ListDonViMoel.push(DonViMoel);
         }
         const tree = this.buildTree(ListDonViMoel, 'maDonVi', 'maDonViCha', null , null);
        console.log(tree)
        //  let data = this.tranformTreeData(tree);
        //  console.log(data)

        return tree ;
    }));
  }

  // tranformTreeData (list: DonViSelectModel[] , data: DonViSelectModel[] = []) {
  //       for(let item of list){
  //           data.push(item);
  //           this.tranformTreeData(item['children'] , data);
  //       }
  // }

   buildTree(array: object[], keyId, parentKeyId, parent  , tree = [], level = -1) {
     const selft = this;
     if(tree == null){
       tree = [];
     }
     if ( parent === null) {
         parent = {};
         parent[keyId] = null;
     } else {
        tree.push(parent);
     }

     parent['level'] = level;
     const children =  array.filter(child => child[parentKeyId] === parent[keyId]) ;
     if (children != null && children.length > 0) {
         level++;
         for (const child of children) {
            selft.buildTree(array, keyId, parentKeyId, child , tree , level);
         }
        //  if (parent[keyId] == null) {
        //      tree = children;
        //  } else {
        //      parent['children'] = children;
        //  }
        //  for(const child of children){
        //    selft.buildTree(array, keyId, parentKeyId, child , tree , level);
        // }
     };
    //  else {
    //   parent['children'] = null;
    //  }

     return tree;
   }
}
