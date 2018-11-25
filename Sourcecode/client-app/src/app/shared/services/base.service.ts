import {  OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


export class BaseService implements OnInit {
  public BaseUrl = 'http://localhost:57907';

  getHeader () {
      return { headers: new HttpHeaders({ 'Content-Type': 'application/json' })} ;
  }
  ngOnInit() {

  }
}
