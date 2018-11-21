import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject, Observable, of,  Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/from';
import { delay } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ChucvuDialogComponent } from '../../chucvu-dialog/chucvu-dialog.component';
import {FromType} from 'src/app/shared/commons/form-type';
import { ModalSize } from 'src/app/shared/commons/modal-size';
import { ActionType } from 'src/app/shared/commons/action-type';

@Component({
  selector: 'app-chucvu-list',
  templateUrl: './chucvu-list.component.html',
  styleUrls: []
})
export class ChucvuListComponent implements OnInit, OnChanges , OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective)
  private dtElement: DataTableDirective;
  subscription:Subscription;
  checkall: boolean = false;
  dtOptions: DataTables.Settings = {};
  list$: any[] = [];
  dtTrigger: Subject<any> = new Subject();
  constructor(private http: HttpClient, private modalService:ModalService) { 
    this.subscription = this.modalService.parentData.subscribe(data=>{
      //do some thing when data change from modal
      //reload if action is submit
      console.log(data);
      if(data && data.action === ActionType.SUBMIT){
        //reload data
        this.onSearch();
      }
    });
  }


  ngOnInit() {

    this.dtOptions = {
      pagingType: 'simple_numbers',
      // pageLength: 2,

      searching: false,
      serverSide: true,
      processing: true,
      columnDefs: [{
        targets: 0,
        defaultContent: '',
        width: '20px',
        orderable: false
      },

      ],

      // select: {
      //   style: 'os',
      //   selector: 'td:first-child'
      // },
      dom: 't<l<".col-lg-8 float-right"ip>>',
      order: [[ 1, 'asc' ]],
      ajax: (dataTableParameters: any, callback) => {
        console.log(dataTableParameters);
        this.getUsers().subscribe(users => {

          this.list$ = users;
          this.checkall = false;
          callback({
            recordsTotal: 10,
            recordsFiltered: 100,
            data: []// this.users$,

          });

        });

      },
      // rowCallback: ( row: Node, data: any, index: number) => {
      //   $('td', row).unbind('click');
      //   $('td', row).bind('click', () => {
      //     debugger;
      //     this.datatableElement.dtInstance.then((tbInstant: DataTables.Api) => {
      //      console.log( tbInstant.rows(".selected").data().length) ;
      //     });
      //   });
      //   return row;
      // }




      // processing: true
    };
    
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  openModal(){
    //change data to child component
    this.modalService.openModalWithComponent(ChucvuDialogComponent,{formType:FromType.INSERT,id:0},ModalSize.LARGE);
    
  }

  /**
   * get data
   */
  getUsers(): Observable<any> {
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
    return of(users).pipe(delay(100));
  };

 onSearch(){
  //reset pagsize to 1
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
  });
 }
  /**
   * select all rows on data table
   */
  onCheckAllChange(){
    this.list$.map(c => {
      c.selected = this.checkall;
    });
  }

  /**
   * select one row on datatable
   */
  onCheckOneChange() {
    if ( this.list$.length === this.list$.filter(c => c.selected === true).length ) {
      this.checkall = true;
    } else {
      this.checkall = false;
    }
  }

  getSelectedItems(){
    return this.list$.filter(c=>c.selected==true);
  }


  /**
   * do something on distroy
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.subscription.unsubscribe();
  }



}
