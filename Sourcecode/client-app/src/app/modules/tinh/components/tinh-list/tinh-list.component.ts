import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject, Observable, of,  Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/from';
import { delay } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TinhDialogComponent } from '../tinh-dialog/tinh-dialog.component';
import {FromType} from 'src/app/shared/commons/form-type';
import { ModalSize } from 'src/app/shared/commons/modal-size';
import { ActionType } from 'src/app/shared/commons/action-type';
import { Tinh } from 'src/app/shared/models/tinh.model';
import { TinhService } from 'src/app/https/tinh.service';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { HttpResult } from './../../../../shared/commons/http-result';

@Component({
  selector: 'app-tinh-list',
  templateUrl: './tinh-list.component.html',
  styleUrls: ['./tinh-list.component.css']
})
export class TinhListComponent implements OnInit, OnChanges , OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective)
  private dtElement: DataTableDirective;
  filterCondition: FilterCondition;
  subscription: Subscription;
  checkall = false;
  data: Tinh[] = [];
  dtOptions: DataTables.Settings = {};
  list$: any[] = [];
  dtTrigger: Subject<any> = new Subject();
  constructor(private http: HttpClient, private modalService: ModalService, private tinhService: TinhService) {
    this.subscription = this.modalService.parentData.subscribe(data => {
      // do some thing when data change from modal
      // reload if action is submit
      console.log(data);
      if ( data && data.action === ActionType.SUBMIT) {
        // reload data
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
        this.getList().subscribe(users => {

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

  openModal() {
    // change data to child component
    this.modalService.openModalWithComponent(TinhDialogComponent, { formType: FromType.INSERT, id: 0} , ModalSize.LARGE);

  }

  /**
   * get data
   */
  getList(): Observable<any> {
    console.log('Get List Tinh');
    this.tinhService.search(this.filterCondition).subscribe((res: HttpResult) => {
      this.data = res.Data;
    });
    return of(this.data).pipe(delay(100));
  }

 onSearch() {
  // reset pagsize to 1
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
  onCheckAllChange() {
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

  getSelectedItems() {
    return this.list$.filter(c => c.selected === true);
  }


  /**
   * do something on distroy
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.subscription.unsubscribe();
  }

}
