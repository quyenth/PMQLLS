import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams  } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { UserRolesModel } from './user_role.model';
import { Select2Model } from 'src/app/shared/models/select2.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService extends BaseService {

  constructor(private http: HttpClient ) {
    super();
  }

  search(users: string , role: string , pageIndex: number , pageSize: number ): Observable<HttpResult> {
    const params = new HttpParams()
                          .set('users', users)
                          .set('role', role)
                          .set('pageIndex', pageIndex.toString())
                          .set('pageSize', pageSize.toString());
    const url = this.BaseUrl + '/api/Role/GetListUserRole';
    return this.http.get<HttpResult>(url, { params: params });
  }

  save(model: UserRolesModel) {
    model.roleId = model.roleId.toString();
    model.tinhId = model.tinhId.toString();
    const url = this.BaseUrl + '/api/Role/SaveUserRole';
    return this.http.post<HttpResult>(url, JSON.stringify(model), this.getHeader());
    }

  delete(model: UserRolesModel): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Role/DeleteUserRole';
    return this.http.post<HttpResult>(url, model , this.getHeader());
  }

  saveList(list: UserRolesModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Role/saveList';
    return this.http.post<HttpResult>(url, list);
  }
  delectList(list: UserRolesModel[]): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Role/DeleteList';
    return this.http.post<HttpResult>(url, list , this.getHeader());
  }
  getById(id: any,  roleId: any): Observable<HttpResult> {
    const url = this.BaseUrl + '/api/Role/GetUserRoleByUserId/' + id;
    const params = new HttpParams()
                          .set('roleId', roleId);
    return this.http.get<HttpResult>(url, { params: params });
  }
  getAllUser(): Observable<Select2Model[]> {
    const url = this.BaseUrl + '/api/Account/GetListUser';
    return this.http.get<HttpResult>(url).pipe(map(res => {
        const result: Select2Model[] = [] ;
        res.data.forEach(element => {
          result.push(new Select2Model (element.id, element.userName));
        });
        return result ;
    }));
  }
}
