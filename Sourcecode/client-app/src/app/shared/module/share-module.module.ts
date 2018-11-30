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


export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'DD/MM/YYYY',
    containerClass: 'theme-green'
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
    BsDatepickerModule.forRoot()
  ],
  declarations: [ConfirmDialogComponent, PagingComponent],
  exports : [
    DataTablesModule, FormsModule, ReactiveFormsModule , ModalModule ,
    PaginationModule, NgxSpinnerModule, PagingComponent , ToastrModule , BrowserAnimationsModule , BsDatepickerModule
  ]
})
export class ShareModule { }
