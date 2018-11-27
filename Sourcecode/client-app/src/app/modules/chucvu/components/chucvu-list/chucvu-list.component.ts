import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject, Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/from';
import { delay } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { FromType } from 'src/app/shared/commons/form-type';
import { ModalSize } from 'src/app/shared/commons/modal-size';
import { ActionType } from 'src/app/shared/commons/action-type';
import { ChucvuDialogComponent } from '../chucvu-dialog/chucvu-dialog.component';
import { ChucvuService } from 'src/app/https/chucvu.service';
import { HttpResult } from 'src/app/shared/commons/http-result';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { OrderInfo } from 'src/app/shared/models/order-info';
import { HttpResultStatus } from 'src/app/shared/commons/http-result-status';
import { DataTableSetting } from 'src/app/shared/commons/datatable-setting';
import { SearchInfo } from 'src/app/shared/models/search-info';
import { OperationType } from 'src/app/shared/commons/operation-type';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({

  templateUrl: './chucvu-list.component.html',
  styleUrls: []
})
export class ChucvuListComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective)
  private dtElement: DataTableDirective;
  subscription: Subscription;
  checkall: boolean = false;
  dtOptions: DataTables.Settings = {};
  filter: FilterCondition = new FilterCondition();
  searchdata: string;
  list$: any[] = [];
  dtTrigger: Subject<any> = new Subject();
  constructor(private chucvuService: ChucvuService, private modalService: ModalService,
    private spinner: NgxSpinnerService, private confirmationDialogService: ConfirmationDialogService
    ) {
    this.subscription = this.modalService.parentData.subscribe(data => {
      //do some thing when data change from modal
      //reload if action is submit
      console.log(data);
      if (data && data.action === ActionType.SUBMIT) {
        //reload data
        this.onSearch();
      }
    });
  }


  ngOnInit() {
    this.dtOptions = DataTableSetting.getDefaultSetting();
    this.dtOptions.ajax = (dataTableParameters: any, callback) => {
      console.log(dataTableParameters);

      this.filter.PageSize = dataTableParameters.length;
      this.filter.PageIndex = (dataTableParameters.start / dataTableParameters.length) + 1;
      this.filter.Orders = [new OrderInfo("Name", false)];
      if (this.searchdata !== "" && this.searchdata !== undefined) {


        this.filter.SearchCondition = [new SearchInfo("Name", OperationType.Contains, this.searchdata)];
      }
      else{
        this.filter.SearchCondition =[];
      }
      this.filter.Paging = true;

      this.getList(this.filter).subscribe(result => {

        if (result.status === HttpResultStatus.OK) {
          this.list$ = result.data.list;
          this.checkall = false;
          callback({
            recordsTotal: result.data.list.length,
            recordsFiltered: result.data.total,
            data: []// this.users$,

          });
        }



      });

    };
    // this.dtOptions = {
    //   pagingType: 'simple_numbers',
    //   language:{
    //     paginate:{
    //       first:'«',
    //       next:'›',
    //       previous:'‹',
    //       last:'»'
    //     },
    //     info:'Hiển thị từ _START_ đến _END_ trong _TOTAL_ bản ghi',
    //     infoFiltered:'',
    //     lengthMenu:'Hiển thị _MENU_ bản ghi'
    //   },
    //    pageLength: 2,

    //   searching: false,
    //   serverSide: true,
    //   processing: true,
    //   columnDefs: [{
    //     targets: 0,
    //     defaultContent: '',
    //     width: '20px',
    //     orderable: false
    //   },

    //   ],

    //   dom: 't<l<".col-lg-8 float-right"ip>>',
    //   ordering:false,
    //   order: [[ 1, 'asc' ]],
    //   ajax: (dataTableParameters: any, callback) => {
    //     console.log(dataTableParameters);
    //     let filter = new FilterCondition();
    //     filter.PageSize = dataTableParameters.length;
    //     filter.PageIndex = (dataTableParameters.start/dataTableParameters.length)+1;
    //     filter.Orders=[new OrderInfo("Name",false)];
    //     filter.SearchCondition=[];
    //     filter.Paging=true;

    //     this.getList(filter).subscribe(result => {

    //       if (result.status===HttpResultStatus.OK){
    //         this.list$ = result.data.list;
    //         this.checkall = false;
    //         callback({
    //           recordsTotal: result.data.list.length,
    //           recordsFiltered: result.data.total,
    //           data: []// this.users$,

    //         });
    //       }



    //     });

    //   },

    //   // processing: true
    // };

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  openModal() {
    //change data to child component
    this.modalService.openModalWithComponent(ChucvuDialogComponent, { formType: FromType.INSERT, id: 0 }, ModalSize.LARGE);

  }

  /**
   * get data
   */
  getList(filter: FilterCondition): Observable<HttpResult> {
    return this.chucvuService.search(filter);
  };

  onSearch() {
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
  onCheckAllChange() {
    this.list$.map(c => {
      c.selected = this.checkall;
    });
  }

  /**
   * select one row on datatable
   */
  onCheckOneChange() {
    if (this.list$.length === this.list$.filter(c => c.selected === true).length) {
      this.checkall = true;
    } else {
      this.checkall = false;
    }
  }

  /**
   * delete list chuc vu
   * @param items list chuc vu
   */
  onDeletes(items:any[]){
    this.confirmationDialogService.confirm('Xác nhận!', 'Bạn có thực sự muốn xóa?');
    const dialogCloseSubscription = this.confirmationDialogService.subject.subscribe((data) => {
        dialogCloseSubscription.unsubscribe();
        if ( data === ActionType.ACCEPT) {
          this.chucvuService.deletes(items).subscribe((res) => {
            this.onSearch();
        });
      }
    });
  }

  onDeleteSelected(){
    let items = this.getSelectedItems();
    this.confirmationDialogService.confirm('Xác nhận!', 'Bạn có thực sự muốn xóa?');
    const dialogCloseSubscription = this.confirmationDialogService.subject.subscribe((data) => {
        dialogCloseSubscription.unsubscribe();
        if ( data === ActionType.ACCEPT) {
          this.chucvuService.deletes(items).subscribe((res) => {
            this.onSearch();
        });
      }
    });
  }

  getSelectedItems() {
    return this.list$.filter(c => c.selected == true);
  }


  /**
   * do something on distroy
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.subscription.unsubscribe();
  }



}
