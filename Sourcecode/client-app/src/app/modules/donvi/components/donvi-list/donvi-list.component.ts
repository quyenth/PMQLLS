import { ModalType } from './../../../../shared/commons/modal-type';
import { DonViSaveComponent } from './../donvi-save/donvi-save.component';
import { HttpResult } from './../../../../shared/commons/http-result';
import { DonViService } from './../../donvi.service';
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
import { ToastrService } from 'ngx-toastr';
import { OrderInfo } from 'src/app/shared/models/order-info';
import { DonViSelectModel } from '../../DonViSelectModel';


@Component({
  selector: 'app-don-vi-list',
  templateUrl: './donvi-list.component.html'
})
export class DonViListComponent implements OnInit, OnDestroy {


  @ViewChild('SearchName') searchInput: ElementRef ;
  currentPage = 1;
  pageSize = 2;

  list$ = [];
  totalCount: number;
  filterCondition: FilterCondition = new FilterCondition();
  orderInfo: OrderInfo = new OrderInfo('', true);
  ListAllDonVI: DonViSelectModel[];

  subscription: Subscription;
  checkall = false;
  constructor(private donViService: DonViService, private modalService: ModalService,
      private spinner: NgxSpinnerService, private confirmationDialogService: ConfirmationDialogService, private toastr: ToastrService) { }

  ngOnInit() {
    this.subscription = this.modalService.parentData.subscribe(data => {
      if ( data && data.action === ActionType.SUBMIT) {
        this.onSearch();
      }
    });
    this.filterCondition.Paging = true;
    this.filterCondition.PageIndex = this.currentPage;
    this.filterCondition.PageSize = this.pageSize;

    this.filterCondition.Orders = [ ];
    this.onSearch();
    this.donViService.getListAllDonVi().subscribe(res => {
      this.ListAllDonVI = res;
    })
  }

  onSearch (pageIndex: number = 1) {
      this.spinner.show();
      const val = this.searchInput.nativeElement.value;
      this.filterCondition.SearchCondition = [new SearchInfo('tenDonVi', OperationType.Contains, val)];
      this.filterCondition.PageIndex = pageIndex;
      this.currentPage = pageIndex;
      if (this.orderInfo.FieldName) {
        this.filterCondition.Orders = [{...this.orderInfo}];
       } else {
        this.filterCondition.Orders = [];
      }
      this.donViService.search(this.filterCondition).subscribe((res: HttpResult) => {
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
    this.modalService.openModalWithComponent(DonViSaveComponent, { formType: FromType.INSERT, id: 0} , ModalSize.LARGE);
  }

  onEditItem(item) {
    this.modalService.openModalWithComponent(DonViSaveComponent, { formType: FromType.UPDATE, id: item.donViId} , ModalSize.LARGE);
  }

  onDeleteItem (item) {
    this.confirmationDialogService.confirm('Xác nhận!', 'Bạn có thực sự muốn xóa?');
    const dialogCloseSubscription = this.confirmationDialogService.subject.subscribe((data) => {
        dialogCloseSubscription.unsubscribe();
        if ( data === ActionType.ACCEPT) {
          this.donViService.delete(item).subscribe((res) => {
          this.toastr.success('Xóa thành công!');
            this.onSearch();
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
            this.donViService.delectList(listSelected).subscribe((res) => {
            this.toastr.success('Xóa thành công!');
              this.onSearch();
          });
      }
      });

  }

  onEnter() {
    this.onSearch();
  }

  reSort(text: string ) {
    console.log(text);
    if ( this.orderInfo.FieldName === text) {
      this.orderInfo.OrderDesc = !this.orderInfo.OrderDesc;
    } else {
      this.orderInfo.FieldName = text;
      this.orderInfo.OrderDesc = false;
    }
    this.onSearch();
  }

  getSelectedItems() {
    return this.list$.filter(c => c.selected === true);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
