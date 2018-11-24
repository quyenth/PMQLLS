import { CapbacDialogComponent } from './../capbac-dialog/capbac-dialog.component';
import { HttpResult } from './../../../../shared/commons/http-result';
import { CapbacService } from './../../../../https/capbac.service';
import { Component, OnInit } from '@angular/core';
import { CapBac } from 'src/app/shared/models/cap-bac.model';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { FromType } from 'src/app/shared/commons/form-type';
import { ModalSize } from 'src/app/shared/commons/modal-size';

@Component({
  selector: 'app-capbac-list',
  templateUrl: './capbac-list.component.html',
  styleUrls: ['./capbac-list.component.css']
})
export class CapbacListComponent implements OnInit {
  data: CapBac[] = [];
  filterCondition: FilterCondition;
  checkall = false;
  dtOptions: DataTables.Settings = {};
  constructor(private capbacService: CapbacService, private modalService: ModalService) { }

  ngOnInit() {
    this.capbacService.search(this.filterCondition).subscribe((res: HttpResult) => {
      this.data = res.Data;
    });
  }

  onSearch () {
    this.capbacService.search(this.filterCondition).subscribe((res: HttpResult) => {
      this.data = res.Data;
    });
  }

  onAddCapBac () {
      this.openModal();
  }

  openModal() {
    this.modalService.openModalWithComponent(CapbacDialogComponent, { formType: FromType.INSERT, id: 0} , ModalSize.LARGE);
  }
}
