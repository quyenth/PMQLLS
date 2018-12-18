import { Injectable, OnInit } from '@angular/core';
import { Select2Model } from '../models/select2.model';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService implements OnInit  {
  ngOnInit() {

  }

  getListGender(): Select2Model[]  {
      const list: Select2Model[] = [new Select2Model('0', 'Nữ'), new Select2Model('1', 'Nam')] ;
      return list;
  }

}
