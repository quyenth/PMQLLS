import { ModalType } from './../../../../shared/commons/modal-type';
import { CapbacDialogComponent } from './../capbac-dialog/capbac-dialog.component';
import { HttpResult } from './../../../../shared/commons/http-result';
import { CapbacService } from './../../../../https/capbac.service';
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
  selector: 'app-capbac-list',
  templateUrl: './capbac-list.component.html',
  styleUrls: ['./capbac-list.component.css']
})
export class CapbacListComponent implements OnInit, OnDestroy {


  @ViewChild('SearchName') searchInput: ElementRef ;
  currentPage = 1;
  pageSize = 2;

  data = [];
  totalCount: number;
  filterCondition: FilterCondition = new FilterCondition();
  subscription: Subscription;
  checkall = false;
  constructor(private capbacService: CapbacService, private modalService: ModalService,
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
    this.filterCondition.SearchCondition = [ new SearchInfo('Text', OperationType.Contains, '')];
    this.filterCondition.Orders = [ ];
    this.capbacService.search(this.filterCondition).subscribe((res: HttpResult) => {
      this.data = res.data.list;
      this.totalCount = res.data.total;
    });
  }

  onSearch (pageIndex: number = 1) {
      this.spinner.show();
      const val = this.searchInput.nativeElement.value;
      this.filterCondition.SearchCondition = [ new SearchInfo('Text', OperationType.Contains, val)];
      this.filterCondition.PageIndex = pageIndex;
      this.currentPage = pageIndex;
      this.capbacService.search(this.filterCondition).subscribe((res: HttpResult) => {
        this.spinner.hide();
        this.data = res.data.list;
        this.totalCount = res.data.total;
      }, (err) => {
        this.spinner.hide();
      });
  }

  onAddCapBac () {
      this.openModal();
  }

  onCheckOneChange() {
    if ( this.data.length === this.data.filter(c => c.selected === true).length ) {
      this.checkall = true;
    } else {
      this.checkall = false;
    }
  }

  onCheckAllChangse () {
      for ( const item of this.data) {
        item.selected = this.checkall;
      }
  }
  onPageSizeChange (pageSize: number) {
    this.pageSize = pageSize;
    this.filterCondition.PageSize = this.pageSize;
    this.onSearch();
  }

  goToPage (page: number) {
    this.onSearch(page);
  }
  openModal() {
    this.modalService.openModalWithComponent(CapbacDialogComponent, { formType: FromType.INSERT, id: 0} , ModalSize.LARGE);
  }

  onEditItem(item) {
    this.modalService.openModalWithComponent(CapbacDialogComponent, { formType: FromType.UPDATE, id: item.capBacId} , ModalSize.LARGE);
  }

  onDeleteItem (item) {
    this.confirmationDialogService.confirm('Xác nhận!', 'Bạn có thực sự muốn xóa?');
    const dialogCloseSubscription = this.confirmationDialogService.subject.subscribe((data) => {
        dialogCloseSubscription.unsubscribe();
        if ( data === ActionType.ACCEPT) {
          this.capbacService.delete(item).subscribe((res) => {
            this.onSearch();
        });
      }
    });
  }

  onDeleteListItem () {
    const listSelected = this.data.filter(c => c.selected === true);
    if (listSelected.length === 0) {
        this.confirmationDialogService.confirm('Thông tin!', 'Bạn chưa chọn mục nào?' , ModalType.INFO);
        return;
    }


      this.confirmationDialogService.confirm('Xác nhận!', 'Bạn có thực sự muốn xóa?' );
      const dialogCloseSubscription = this.confirmationDialogService.subject.subscribe((data) => {
          dialogCloseSubscription.unsubscribe();
          if ( data === ActionType.ACCEPT) {
            this.capbacService.delectList(listSelected).subscribe((res) => {
              this.onSearch();
          });
      }
      });

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
