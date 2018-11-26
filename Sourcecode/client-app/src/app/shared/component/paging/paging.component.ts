import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit, OnChanges {

  @Input() TotalCount: number;
  @Input() PageIndex: number;
  @Input() PageSize: number;
  @Input() DataLength: number;

  @Output() pageSizeChangge = new EventEmitter<number>();
  @Output() currentPageChangge = new EventEmitter<number>();


  itemFrom = 0;
  itemTo = 0;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
      this.itemFrom = (this.PageIndex - 1) * this.PageSize + 1;
      this.itemTo = this.itemFrom + this.DataLength - 1;
  }
  onChangePageSize(pageSize) {
    this.pageSizeChangge.emit(pageSize);
  }
  pageChanged(event: PageChangedEvent): void {
    this.currentPageChangge.emit(event.page);
  }
}
