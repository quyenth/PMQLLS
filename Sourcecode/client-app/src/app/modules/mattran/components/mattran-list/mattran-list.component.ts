import { ModalType } from './../../../../shared/commons/modal-type';
import { MatTranSaveComponent } from './../mattran-save/mattran-save.component';
import { HttpResult } from './../../../../shared/commons/http-result';
import { MatTranService } from './../../mattran.service';
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
  selector: 'app-mat-tran-list',
  templateUrl: './mattran-list.component.html'
})
export class MatTranListComponent implements OnInit, OnDestroy {

  @ViewChild('SearchMa') searchMa: ElementRef ;
  @ViewChild('SearchThoiGian') searchThoiGian: ElementRef ;
  @ViewChild('SearchDiaBan') searchDiaBan: ElementRef ;

  currentPage = 1;
  pageSize = 2;

  list$ = [];
  totalCount: number;
  filterCondition: FilterCondition = new FilterCondition();
  subscription: Subscription;
  checkall = false;
  constructor(private matTranService: MatTranService, private modalService: ModalService,
      private spinner: NgxSpinnerService, private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.subscription = this.modalService.parentData.subscribe(data => {
      if ( data && data.action === ActionType.SUBMIT) {
        this.onSearch();
      }
    });
    this.filterCondition.Paging = true;
    this.filterCondition.PageIndex = this.currentPage;
    this.filterCondition.PageSize = this.pageSize;
    this.filterCondition.SearchCondition = [];
    this.filterCondition.Orders = [ ];
    this.onSearch();
  }

  onSearch (pageIndex: number = 1) {
      this.spinner.show();
      const maVal = this.searchMa.nativeElement.value;
      const diabanVal = this.searchDiaBan.nativeElement.value;
      const thoiGianVal = this.searchThoiGian.nativeElement.value;

      this.filterCondition.SearchCondition = [
          new SearchInfo('Ma', OperationType.Contains, maVal),
          new SearchInfo('ThoiGian', OperationType.Contains, thoiGianVal),
          new SearchInfo('DiaBan', OperationType.Contains, diabanVal)
      ];
      this.filterCondition.PageIndex = pageIndex;
      this.currentPage = pageIndex;
      this.matTranService.search(this.filterCondition).subscribe((res: HttpResult) => {
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
    this.modalService.openModalWithComponent(MatTranSaveComponent, { formType: FromType.INSERT, id: 0} , ModalSize.LARGE);
  }

  onEditItem(item) {
    this.modalService.openModalWithComponent(MatTranSaveComponent, { formType: FromType.UPDATE, id: item.id} , ModalSize.LARGE);
  }

  onDeleteItem (item) {
    this.confirmationDialogService.confirm('Xác nhận!', 'Bạn có thực sự muốn xóa?');
    const dialogCloseSubscription = this.confirmationDialogService.subject.subscribe((data) => {
        dialogCloseSubscription.unsubscribe();
        if ( data === ActionType.ACCEPT) {
          this.matTranService.delete(item).subscribe((res) => {
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
            this.matTranService.delectList(listSelected).subscribe((res) => {
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
