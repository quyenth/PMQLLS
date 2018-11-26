import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmDialogComponent } from '../component/confirm-dialog/confirm-dialog.component';
import { PagingComponent } from '../component/paging/paging.component';


@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgxSpinnerModule
  ],
  declarations: [ConfirmDialogComponent, PagingComponent],
  exports : [
    DataTablesModule, FormsModule, ReactiveFormsModule , ModalModule , PaginationModule, NgxSpinnerModule, PagingComponent
  ]
})
export class ShareModule { }
