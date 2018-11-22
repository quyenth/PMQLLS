import { Injectable } from '@angular/core';
import { inherits } from 'util';
import { BaseService } from '../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { HttpResult } from '../shared/commons/http-result';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChucvuService extends BaseService {

  constructor(private http:HttpClient) {
    super();
  }

  /**
   * insert/update chuc vu. id=0=> insert else update
   * @param item chuc vu iteam
   */
  save(item:any):Observable<HttpResult>{
    let url = this.BaseUrl+"/api/chucvu/save";
    return this.http.post<HttpResult>(url,item);
  }

  /**
   * insert/update chuc vu. id=0=> insert else update
   * @param searchCondition search condition
   */
  search(searchCondition:any):Observable<HttpResult>{
    let url = this.BaseUrl+"/api/chucvu/search";
    return this.http.post<HttpResult>(url,searchCondition);
  }

  

}
