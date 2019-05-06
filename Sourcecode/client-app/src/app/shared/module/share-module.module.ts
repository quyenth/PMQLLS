import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmDialogComponent } from '../component/confirm-dialog/confirm-dialog.component';
import { PagingComponent } from '../component/paging/paging.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { Select2Module } from 'ng2-select2';

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'YYYY/MM/DD',
    containerClass: 'theme-green',
  });
}

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgxSpinnerModule,
    ToastrModule.forRoot({progressBar : true, closeButton : true}),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    Select2Module,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn',
      cancelButtonText: '<i class="fa fa-times"></i> Đóng',
      confirmButtonText: '<i class="fa fa-save"></i> Lưu',
      title: 'Xác nhận',
      focusConfirm: true
  })
  ],
  declarations: [ConfirmDialogComponent, PagingComponent ],
  providers: [{ provide: BsDatepickerConfig, useFactory: getDatepickerConfig }],
  exports : [
    DataTablesModule, FormsModule, ReactiveFormsModule , ModalModule ,
    PaginationModule, NgxSpinnerModule, PagingComponent , ToastrModule ,
    BrowserAnimationsModule , BsDatepickerModule , NgSelectModule , SweetAlert2Module , Select2Module
  ]
})
export class ShareModule { }
