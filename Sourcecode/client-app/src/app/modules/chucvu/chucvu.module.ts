import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChucvuListComponent } from './components/chucvu-list/chucvu-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/loader';
import { ChucvuDialogComponent } from './components/chucvu-dialog/chucvu-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    BsModalService,
    ComponentLoaderFactory
  ],
  entryComponents: [
    ChucvuDialogComponent,
  ],
  declarations: [ChucvuListComponent, ChucvuDialogComponent],
  exports: [ChucvuListComponent]
})
export class ChucvuModule { }
