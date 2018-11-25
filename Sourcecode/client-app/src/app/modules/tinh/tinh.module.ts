import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/loader';
import { TinhDialogComponent } from './components/tinh-dialog/tinh-dialog.component';
import { TinhListComponent } from './components/tinh-list/tinh-list.component';




@NgModule({
  imports: [
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ShareModule
    ],
    providers: [
      BsModalService,
      ComponentLoaderFactory
    ],
  entryComponents: [
    TinhDialogComponent,
  ],
  declarations: [TinhListComponent, TinhDialogComponent]
})
export class TinhModule { }
