import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChucvuListComponent } from './components/chucvu-list/chucvu-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { ChucvuAdComponent } from './components/chucvu-ad/chucvu-ad.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/loader';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ModalModule.forRoot()

  ],
  providers:[
    BsModalService,
    ComponentLoaderFactory
  ],
  entryComponents:[
    ChucvuAdComponent
  ],
  declarations: [ChucvuListComponent, ChucvuAdComponent],
  exports: [ChucvuListComponent]
})
export class ChucvuModule { }
