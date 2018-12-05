import { ModalType } from './../../../../shared/commons/modal-type';
import { XaSaveComponent } from './../xa-save/xa-save.component';
import { HttpResult } from './../../../../shared/commons/http-result';
import { XaService } from './../../xa.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { FromType } from 'src/app/shared/commons/form-type';
import { ModalSize } from 'src/app/shared/commons/modal-size';
import { OperationType } from 'src/app/shared/commons/operation-type';
import { SearchInfo } from 'src/app/shared/models/search-info';
import { ActionType } from 'src/app/shared/commons/action-type';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';

@Component({
  selector: 'app-xa-list',
  templateUrl: './xa-list.component.html'
})
export class XaListComponent implements OnInit, OnDestroy {


  @ViewChild('SearchName') searchInput: ElementRef ;
  currentPage = 1;
  pageSize = 2;

  list$ = [];
  totalCount: number;
  filterCondition: FilterCondition = new FilterCondition();
  subscription: Subscription;
  checkall = false;
  constructor(private xaService: XaService, private modalService: ModalService,
      private spinner: NgxSpinnerService, private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.subscription = this.modalService.parentData.subscribe(data => {
      if ( data && data.action === ActionType.SUBMIT) {
        debugger;
        console.log(this.currentPage);
        this.onSearch(this.currentPage);
      }
    });
    this.filterCondition.Paging = true;
    this.filterCondition.PageIndex = this.currentPage;
    this.filterCondition.PageSize = this.pageSize;
   
    this.filterCondition.Orders = [ ];
    this.onSearch();
  }

  onSearch (pageIndex: number = 1) {
      this.spinner.show();
      const val = this.searchInput.nativeElement.value;
      this.filterCondition.SearchCondition = [ 
	      new SearchInfo('Tenxa', OperationType.Contains, val)
	  ];
      this.filterCondition.PageIndex = pageIndex;
      this.currentPage = pageIndex;
      this.xaService.search(this.filterCondition).subscribe((res: HttpResult) => {
        this.spinner.hide();
        this.list$ = res.data.list;
        this.totalCount = res.data.total;
      }, (err) => {
        this.spinner.hide();
      });
  }


  onCheckOneChange() {
    if ( this.list$.length === this.list$.filter(c => c.selected === true).length ) {
      this.checkall = true;
    } else {
      this.checkall = false;
    }
  }

  onCheckAllChange () {
    this.list$.map(c => {
      c.selected = this.checkall;
    });
  }
  onPageSizeChange (pageSize: number) {
    this.pageSize = pageSize;
    this.filterCondition.PageSize = this.pageSize;
    this.onSearch();
  }

  goToPage (page: number) {
    this.onSearch(page);
  }


  onAddNew () {
    this.modalService.openModalWithComponent(XaSaveComponent, { formType: FromType.INSERT, id: 0} , ModalSize.LARGE);
  }

  onEditItem(item) {
    this.modalService.openModalWithComponent(XaSaveComponent, { formType: FromType.UPDATE, id: item.xaId} , ModalSize.LARGE);
  }

  onDeleteItem (item) {
    this.confirmationDialogService.confirm('Xác nhận!', 'Bạn có thực sự muốn xóa?');
    let dialogCloseSubscription = this.confirmationDialogService.subject.subscribe((data) => {
        dialogCloseSubscription.unsubscribe();
        if ( data === ActionType.ACCEPT) {
          this.xaService.delete(item).subscribe((res) => {
            this.onSearch(this.currentPage);
        });
      }
    });
  }

  onDeleteSelected () {
    const listSelected = this.list$.filter(c => c.selected === true);
    if (listSelected.length === 0) {
        this.confirmationDialogService.confirm('Thông tin!', 'Bạn chưa chọn mục nào?' , ModalType.INFO);
        return;
    }


      this.confirmationDialogService.confirm('Xác nhận!', 'Bạn có thực sự muốn xóa?' );
      const dialogCloseSubscription = this.confirmationDialogService.subject.subscribe((data) => {
          dialogCloseSubscription.unsubscribe();
          if ( data === ActionType.ACCEPT) {
            this.xaService.delectList(listSelected).subscribe((res) => {
              this.onSearch();
          });
      }
      });

  }

  onEnter() {
    this.onSearch();
  }
  getSelectedItems() {
    return this.list$.filter(c => c.selected === true);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}