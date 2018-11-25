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

@Component({
  selector: 'app-capbac-list',
  templateUrl: './capbac-list.component.html',
  styleUrls: ['./capbac-list.component.css']
})
export class CapbacListComponent implements OnInit, OnDestroy {


  @ViewChild('SearchName') searchInput: ElementRef ;
  currentPage = 1;
  pageSize = 20;
  itemFrom = 0;
  itemTo = 0;
  data = [];
  totalCount: number;
  filterCondition: FilterCondition = new FilterCondition();
  subscription: Subscription;
  checkall = false;
  constructor(private capbacService: CapbacService, private modalService: ModalService) { }

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
      this.itemFrom = (this.currentPage - 1) * this.pageSize + 1;
      this.itemTo = this.itemFrom + this.data.length;
      this.itemTo = this.itemFrom + this.data.length - 1;
    });
  }

  onSearch (pageIndex: number = 1) {
      const val = this.searchInput.nativeElement.value;
      this.filterCondition.SearchCondition = [ new SearchInfo('Text', OperationType.Contains, val)];
      this.filterCondition.PageIndex = pageIndex;
      this.capbacService.search(this.filterCondition).subscribe((res: HttpResult) => {
      this.data = res.data.list;
      this.totalCount = res.data.total;
      this.itemFrom = (this.currentPage - 1) * this.pageSize + 1;
      this.itemTo = this.itemFrom + this.data.length - 1;
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
      for ( let item of this.data) {
        item.selected = this.checkall;
      }
  }
  openModal() {
    this.modalService.openModalWithComponent(CapbacDialogComponent, { formType: FromType.INSERT, id: 0} , ModalSize.LARGE);
  }

  onEditItem(item) {

  }

  onDeleteItem (item) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
