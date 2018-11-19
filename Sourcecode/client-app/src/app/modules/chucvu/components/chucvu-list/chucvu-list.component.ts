import { Component, OnInit } from '@angular/core';
import { Subject, Observable, observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/from';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-chucvu-list',
  templateUrl: './chucvu-list.component.html',
  styleUrls: []
})
export class ChucvuListComponent implements OnInit {
  dtOptions:DataTables.Settings={};
  users$: any[] = [];
  dtTrigger:Subject<any>=new Subject();
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers', //'full_numbers',
      pageLength: 2,
      select: true,
      searching:false,
      dom:'t<l<".col-lg-8 float-right"ip>>'
      // paging:true,
      // processing: true
    };
    this.getUsers().subscribe(users=>{
      console.log(users);
      this.users$ = users;
      this.dtTrigger.next();
      
    })
  
   
    // this.data.getUsers().subscribe(data => {
    //   this.users$ = data;
    //   this.dtTrigger.next();
    // });
  }

  getUsers():Observable<any> {
    console.log("get users");
    var users = [
      {
        name: "quyenth",
        email: "thai hong quyen"
      },
      {
        name: "quyenth1",
        email: "thai hong quyen"
      },
      {
        name: "quyenth2",
        email: "thai hong quyen"
      },
      {
        name: "quyenth",
        email: "thai hong quyen"
      }
    ];
    return  of(users).pipe(delay(200));
  };

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
