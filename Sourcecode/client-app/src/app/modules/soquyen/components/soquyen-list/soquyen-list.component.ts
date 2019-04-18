import { ModalType } from './../../../../shared/commons/modal-type';
import { SoQuyenSaveComponent } from './../soquyen-save/soquyen-save.component';
import { HttpResult } from './../../../../shared/commons/http-result';
import { SoQuyenService } from './../../soquyen.service';
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
import {SwalDirective, SwalComponent } from '@toverux/ngx-sweetalert2';


@Component({
  selector: 'app-so-quyen-list',
  templateUrl: './soquyen-list.component.html'
})
export class SoQuyenListComponent implements OnInit, OnDestroy {


  @ViewChild('SearchName') searchInput: ElementRef ;
  @ViewChild('deleteItemSwal') private deleteItemSwal: SwalComponent;

  currentPage = 1;
  pageSize = 10;

  list$ = [];
  totalCount: number;
  filterCondition: FilterCondition = new FilterCondition();
  orderInfo: OrderInfo = new OrderInfo('', true);

  subscription: Subscription;
  checkall = false;
  constructor(private soQuyenService: SoQuyenService, private modalService: ModalService,
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
  }

  onSearch (pageIndex: number = 1) {
      this.spinner.show();
      const val = this.searchInput.nativeElement.value;
      this.filterCondition.SearchCondition = [
      new SearchInfo('Name', OperationType.Contains, val)
    ];
      this.filterCondition.PageIndex = pageIndex;
      this.currentPage = pageIndex;
      if (this.orderInfo.FieldName) {
        this.filterCondition.Orders = [{...this.orderInfo}];
       } else {
        this.filterCondition.Orders = [];
      }
      this.soQuyenService.search(this.filterCondition).subscribe((res: HttpResult) => {
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
    this.modalService.openModalWithComponent(SoQuyenSaveComponent, { formType: FromType.INSERT, id: 0} , ModalSize.LARGE);
  }

  onEditItem(item) {
    this.modalService.openModalWithComponent(SoQuyenSaveComponent, { formType: FromType.UPDATE, id: item.id} , ModalSize.LARGE);
  }

  onDeleteItem (item) {
    this.deleteItemSwal.text = 'Bạn thực sự muốn xóa?' ;
    this.deleteItemSwal.show().then( (result) => {
            if ( result.value ) {
              this.soQuyenService.delete(item).subscribe((res) => {
                this.toastr.success('Xóa thành công!');
                  this.onSearch();
              });
            }
        }
    );
  }


  onDeleteSelected () {
    const listSelected = this.list$.filter(c => c.selected === true);

    this.deleteItemSwal.text = 'Bạn thực sự muốn xóa các mục đã chọn?' ;
    this.deleteItemSwal.show().then( (result) => {
      if ( result.value ) {
        this.soQuyenService.delectList(listSelected).subscribe((res) => {
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
